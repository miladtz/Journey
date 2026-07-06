import { getAllProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import { CategoriesClient } from "@/components/categories/CategoriesClient";

export default async function CategoriesPage() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);
  return <CategoriesClient products={products} categories={categories} />;
}
