import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/auth-guard";
import { prisma } from "@/lib/db";
import { AdminNav } from "@/components/admin/AdminNav";
import { CategoryForm } from "@/components/admin/CategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    notFound();
  }

  return (
    <>
      <AdminNav />
      <CategoryForm category={category} />
    </>
  );
}
