"use client";

import { useLanguage } from "@/context/LanguageContext";
import { CategoryCard } from "@/components/categories/CategoryCard";
import type { Category } from "@/generated/prisma/client";
import type { ProductWithRelations } from "@/types";

export function CategoriesClient({
  categories,
  products,
}: {
  categories: Category[];
  products: ProductWithRelations[];
}) {
  const { t, locale } = useLanguage();
  const { title, subtitle } = t.categories.hero;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h1>
        <p className="mt-6 text-lg text-muted text-balance">{subtitle}</p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const categoryProducts = products.filter((product) => product.category === category.slug);
          const live = categoryProducts.length > 0;
          return (
            <CategoryCard
              key={category.slug}
              categoryKey={category.slug}
              icon={category.icon}
              name={locale === "fa" ? category.nameFa : category.nameEn}
              desc={locale === "fa" ? category.descFa : category.descEn}
              live={live}
              product={categoryProducts[0] ?? null}
            />
          );
        })}
      </div>
    </div>
  );
}
