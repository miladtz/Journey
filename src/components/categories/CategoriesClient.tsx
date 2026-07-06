"use client";

import { useLanguage } from "@/context/LanguageContext";
import { CategoryCard } from "@/components/categories/CategoryCard";
import type { ProductWithRelations } from "@/types";

export function CategoriesClient({ products }: { products: ProductWithRelations[] }) {
  const { t } = useLanguage();
  const { title, subtitle } = t.categories.hero;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h1>
        <p className="mt-6 text-lg text-muted text-balance">{subtitle}</p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.categories.items.map((item) => {
          const categoryProduct = item.live
            ? products.find((product) => product.category === item.key)
            : null;
          return (
            <CategoryCard
              key={item.key}
              categoryKey={item.key}
              name={item.name}
              desc={item.desc}
              live={item.live}
              product={categoryProduct}
            />
          );
        })}
      </div>
    </div>
  );
}
