"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { ProductWithRelations } from "@/types";

export function Hero({ product }: { product: ProductWithRelations | null }) {
  const { t, locale } = useLanguage();
  const image = product?.images[0];

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_60%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div className="text-center lg:text-start">
          <Badge tone="accent">{t.home.hero.eyebrow}</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t.home.hero.title}
          </h1>
          <p className="mt-6 text-lg text-muted text-balance">{t.home.hero.subtitle}</p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href={product ? `/products/${product.slug}` : "/categories"} size="lg">
              {t.home.hero.ctaPrimary}
              <ArrowRight className={locale === "fa" ? "h-4 w-4 rotate-180" : "h-4 w-4"} />
            </Button>
            <Button href="/how-it-works" variant="secondary" size="lg">
              {t.home.hero.ctaSecondary}
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-accent/10 blur-3xl" />
          {image ? (
            <div className="mx-auto aspect-square w-full max-w-md">
              <img
                src={image.url}
                alt={image.alt}
                className="h-full w-full object-contain drop-shadow-2xl"
              />
            </div>
          ) : null}
          {product ? (
            <div className="mx-auto mt-2 flex max-w-md items-center justify-between rounded-2xl border border-border bg-surface/80 px-5 py-4 backdrop-blur">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {locale === "fa" ? product.nameFa : product.nameEn}
                </p>
                <p className="text-sm text-muted">
                  {t.common.currency}
                  {product.price.toLocaleString()}
                </p>
              </div>
              <Badge tone="success">{t.common.inStock}</Badge>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
