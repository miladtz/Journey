import { requireAdminPage } from "@/lib/auth-guard";
import { getAllProducts } from "@/lib/products";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminProductsTable } from "@/components/admin/AdminProductsTable";

export default async function AdminDashboardPage() {
  await requireAdminPage();
  const products = await getAllProducts();
  return (
    <>
      <AdminNav />
      <AdminProductsTable products={products} />
    </>
  );
}
