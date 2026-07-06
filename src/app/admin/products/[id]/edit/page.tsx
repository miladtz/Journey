import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/auth-guard";
import { prisma } from "@/lib/db";
import { getAllCategories } from "@/lib/categories";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: "asc" } },
        specs: { orderBy: { order: "asc" } },
      },
    }),
    getAllCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return <ProductForm product={product} categories={categories} />;
}
