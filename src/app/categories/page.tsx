import { getAllProducts } from "@/lib/products";
import { CategoriesClient } from "@/components/categories/CategoriesClient";

export default async function CategoriesPage() {
  const products = await getAllProducts();
  return <CategoriesClient products={products} />;
}
