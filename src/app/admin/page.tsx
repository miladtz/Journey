import { requireAdminPage } from "@/lib/auth-guard";
import { getAllProducts } from "@/lib/products";
import { AdminProductsTable } from "@/components/admin/AdminProductsTable";

export default async function AdminDashboardPage() {
  await requireAdminPage();
  const products = await getAllProducts();
  return <AdminProductsTable products={products} />;
}
