import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/auth-guard";
import { categoryInputSchema } from "@/lib/schemas";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const parsed = categoryInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const conflicting = await prisma.category.findUnique({ where: { slug: parsed.data.slug } });
  if (conflicting && conflicting.id !== id) {
    return NextResponse.json({ error: "A category with this slug already exists" }, { status: 409 });
  }

  const current = await prisma.category.findUnique({ where: { id } });
  if (!current) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  // The slug is what products reference, so renaming it would silently
  // orphan every product already filed under the old one.
  if (current.slug !== parsed.data.slug) {
    const productCount = await prisma.product.count({ where: { category: current.slug } });
    if (productCount > 0) {
      return NextResponse.json(
        { error: "Reassign this category's products before changing its slug" },
        { status: 409 }
      );
    }
  }

  const category = await prisma.category.update({ where: { id }, data: parsed.data });
  return NextResponse.json(category);
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
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const productCount = await prisma.product.count({ where: { category: category.slug } });
  if (productCount > 0) {
    return NextResponse.json(
      { error: "Move or delete this category's products before removing it" },
      { status: 409 }
    );
  }

  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
