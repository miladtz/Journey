import { requireAdminPage } from "@/lib/auth-guard";
import { getAllCategories } from "@/lib/categories";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  await requireAdminPage();
  const categories = await getAllCategories();
  return <ProductForm categories={categories} />;
}
