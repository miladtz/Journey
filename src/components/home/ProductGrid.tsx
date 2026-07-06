"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ProductWithRelations } from "@/types";

export function ProductGrid({ products }: { products: ProductWithRelations[] }) {
  const { t, locale } = useLanguage();

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow={t.home.allProducts.eyebrow}
        title={t.home.allProducts.title}
        subtitle={t.home.allProducts.subtitle}
      />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const image = product.images[0];
          const inStock = product.stock > 0;
          return (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <Link href={`/products/${product.slug}`} className="block">
                <div className="flex aspect-square items-center justify-center bg-background">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image.url} alt={image.alt} className="h-full w-full object-contain p-8" />
                  ) : null}
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <Link href={`/products/${product.slug}`} className="block">
                  <h3 className="font-medium text-foreground hover:text-accent">
                    {locale === "fa" ? product.nameFa : product.nameEn}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {locale === "fa" ? product.taglineFa : product.taglineEn}
                  </p>
                </Link>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-lg font-semibold text-foreground">
                    {t.common.currency}
                    {product.price.toLocaleString()}
                  </p>
                  <Badge tone={inStock ? "success" : "neutral"}>
                    {inStock ? t.common.inStock : t.common.outOfStock}
                  </Badge>
                </div>
                <Button href={`/products/${product.slug}`} size="sm" className="mt-4">
                  {t.common.viewDetails}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
