import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/auth-guard";
import { productInputSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const session = await requireAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = productInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { images, specs, ...productData } = parsed.data;

  const existing = await prisma.product.findUnique({ where: { slug: productData.slug } });
  if (existing) {
    return NextResponse.json({ error: "A product with this slug already exists" }, { status: 409 });
  }

  const product = await prisma.product.create({
    data: {
      ...productData,
      images: { create: images.map((image, order) => ({ ...image, order })) },
      specs: { create: specs.map((spec, order) => ({ ...spec, order })) },
    },
  });

  return NextResponse.json(product, { status: 201 });
}
