import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/auth-guard";
import { productInputSchema } from "@/lib/schemas";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const parsed = productInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { images, specs, ...productData } = parsed.data;

  const conflicting = await prisma.product.findUnique({ where: { slug: productData.slug } });
  if (conflicting && conflicting.id !== id) {
    return NextResponse.json({ error: "A product with this slug already exists" }, { status: 409 });
  }

  // Simplest way to keep gallery/spec ordering in sync with the form: drop
  // the old rows and recreate them inside the same update.
  const product = await prisma.product.update({
    where: { id },
    data: {
      ...productData,
      images: {
        deleteMany: {},
        create: images.map((image, order) => ({ ...image, order })),
      },
      specs: {
        deleteMany: {},
        create: specs.map((spec, order) => ({ ...spec, order })),
      },
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
