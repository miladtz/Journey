import { requireAdminPage } from "@/lib/auth-guard";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  await requireAdminPage();
  return <ProductForm />;
}
