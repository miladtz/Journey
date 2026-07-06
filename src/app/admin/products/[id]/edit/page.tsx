import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/auth-guard";
import { prisma } from "@/lib/db";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: "asc" } },
      specs: { orderBy: { order: "asc" } },
    },
  });

  if (!product) {
    notFound();
  }

  return <ProductForm product={product} />;
}
