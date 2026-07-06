import { requireAdminPage } from "@/lib/auth-guard";
import { AdminNav } from "@/components/admin/AdminNav";
import { CategoryForm } from "@/components/admin/CategoryForm";

export default async function NewCategoryPage() {
  await requireAdminPage();
  return (
    <>
      <AdminNav />
      <CategoryForm />
    </>
  );
}
