"use client";

import { useState, type FormEvent } from "react";
import { Smartphone, Laptop, Headphones, Watch, Tablet, Cable, Mail, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ProductWithRelations } from "@/types";

const icons: Record<string, typeof Smartphone> = {
  smartphones: Smartphone,
  laptops: Laptop,
  audio: Headphones,
  wearables: Watch,
  tablets: Tablet,
  accessories: Cable,
};

export function CategoryCard({
  categoryKey,
  name,
  desc,
  live,
  product,
}: {
  categoryKey: string;
  name: string;
  desc: string;
  live: boolean;
  product?: ProductWithRelations | null;
}) {
  const { t, locale } = useLanguage();
  const Icon = icons[categoryKey] ?? Smartphone;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/category-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: categoryKey, email }),
    });
    setStatus(res.ok ? "sent" : "idle");
  }

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <Badge tone={live ? "success" : "neutral"}>
          {live ? t.categories.liveLabel : t.categories.comingSoonLabel}
        </Badge>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{name}</h3>
      <p className="mt-1.5 text-sm text-muted">{desc}</p>

      <div className="mt-5 flex-1">
        {live && product ? (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
            {product.images[0] ? (
              <img
                src={product.images[0].url}
                alt={product.images[0].alt}
                className="h-14 w-14 shrink-0 object-contain"
              />
            ) : null}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {locale === "fa" ? product.nameFa : product.nameEn}
              </p>
              <p className="text-sm text-muted">
                {t.common.currency}
                {product.price.toLocaleString()}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {live && product ? (
        <Button href={`/products/${product.slug}`} variant="secondary" className="mt-5">
          {t.common.viewDetails}
        </Button>
      ) : status === "sent" ? (
        <p className="mt-5 flex items-center gap-2 text-sm font-medium text-accent">
          <Check className="h-4 w-4" />
          {t.categories.notifySuccess}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute top-1/2 start-3 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t.common.emailPlaceholder}
              className="w-full rounded-full border border-border bg-background py-2 ps-9 pe-3 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <Button type="submit" size="sm" disabled={status === "sending"}>
            {status === "sending" ? t.common.sending : t.common.notifyMe}
          </Button>
        </form>
      )}
    </div>
  );
}
