"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

export function FinalCTA({ productSlug }: { productSlug: string | null }) {
  const { t } = useLanguage();
  const { title, subtitle, cta } = t.home.finalCta;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
        <p className="mt-4 text-lg text-muted">{subtitle}</p>
        <div className="mt-8">
          <Button href={productSlug ? `/products/${productSlug}` : "/categories"} size="lg">
            {cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
