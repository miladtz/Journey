import { requireAdminPage } from "@/lib/auth-guard";
import { getAllCategories } from "@/lib/categories";
import { prisma } from "@/lib/db";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminCategoriesTable } from "@/components/admin/AdminCategoriesTable";

export default async function AdminCategoriesPage() {
  await requireAdminPage();
  const categories = await getAllCategories();
  const grouped = await prisma.product.groupBy({ by: ["category"], _count: { category: true } });
  const productCounts = Object.fromEntries(grouped.map((row) => [row.category, row._count.category]));

  return (
    <>
      <AdminNav />
      <AdminCategoriesTable categories={categories} productCounts={productCounts} />
    </>
  );
}
