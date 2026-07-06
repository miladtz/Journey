"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ProductWithRelations } from "@/types";

export function ProductView({ product }: { product: ProductWithRelations }) {
  const { t, locale } = useLanguage();
  const { addItem } = useCart();

  const colorOptions = useMemo(
    () => product.images.filter((image) => image.colorName),
    [product.images]
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const activeImage = product.images[selectedImageIndex] ?? product.images[0];
  const selectedColor = activeImage?.colorName ?? null;
  const inStock = product.stock > 0;

  async function handleAddToBasket() {
    await addItem(product.id, quantity, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-3xl border border-border bg-surface">
            {activeImage ? (
              <img
                src={activeImage.url}
                alt={activeImage.alt}
                className="h-full w-full object-contain p-10"
              />
            ) : null}
          </div>
          {product.images.length > 1 ? (
            <div className="mt-4 flex justify-center gap-3">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`h-16 w-16 overflow-hidden rounded-xl border-2 bg-surface transition-colors ${
                    index === selectedImageIndex ? "border-accent" : "border-border"
                  }`}
                  aria-label={image.alt}
                >
                  <img src={image.url} alt={image.alt} className="h-full w-full object-contain p-2" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <Badge tone={inStock ? "success" : "warning"}>
            {inStock ? t.common.inStock : t.common.outOfStock}
          </Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {locale === "fa" ? product.nameFa : product.nameEn}
          </h1>
          <p className="mt-3 text-base text-muted">
            {locale === "fa" ? product.taglineFa : product.taglineEn}
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-foreground">
              {t.common.currency}
              {product.price.toLocaleString()}
            </span>
            {product.compareAtPrice ? (
              <span className="text-lg text-muted line-through">
                {t.common.currency}
                {product.compareAtPrice.toLocaleString()}
              </span>
            ) : null}
          </div>

          {colorOptions.length > 0 ? (
            <div className="mt-8">
              <p className="text-sm font-medium text-foreground">{t.product.chooseColor}</p>
              <div className="mt-3 flex gap-3">
                {colorOptions.map((image) => {
                  const productImageIndex = product.images.findIndex((img) => img.id === image.id);
                  const isSelected = image.colorName === selectedColor;
                  return (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setSelectedImageIndex(productImageIndex)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-transform ${
                        isSelected ? "border-accent scale-110" : "border-transparent"
                      }`}
                      title={image.colorName ?? undefined}
                      aria-label={image.colorName ?? undefined}
                    >
                      <span
                        className="h-7 w-7 rounded-full border border-black/10"
                        style={{ backgroundColor: image.colorHex ?? undefined }}
                      />
                    </button>
                  );
                })}
              </div>
              {selectedColor ? <p className="mt-2 text-sm text-muted">{selectedColor}</p> : null}
            </div>
          ) : null}

          <div className="mt-8">
            <p className="text-sm font-medium text-foreground">{t.product.quantityLabel}</p>
            <div className="mt-3 inline-flex items-center rounded-full border border-border">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center text-muted hover:text-foreground"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="flex h-10 w-10 items-center justify-center text-muted hover:text-foreground"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="flex-1" disabled={!inStock} onClick={handleAddToBasket}>
              {justAdded ? t.product.addedToBasket : t.product.addToBasket}
            </Button>
          </div>

          <div className="mt-8 space-y-3 rounded-2xl border border-border bg-surface p-5">
            <p className="flex items-center gap-2.5 text-sm text-foreground">
              <Truck className="h-4 w-4 text-accent" />
              {t.product.shippingNote}
            </p>
            <p className="flex items-center gap-2.5 text-sm text-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" />
              {t.product.guarantee}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-3xl">
        <p className="text-base leading-relaxed text-muted">
          {locale === "fa" ? product.descriptionFa : product.descriptionEn}
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-foreground">{t.product.specsTitle}</h2>
        <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
          {product.specs.map((spec) => (
            <div key={spec.id} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:justify-between">
              <dt className="text-sm font-medium text-muted">
                {locale === "fa" ? spec.labelFa : spec.labelEn}
              </dt>
              <dd className="text-sm text-foreground sm:text-end">
                {locale === "fa" ? spec.valueFa : spec.valueEn}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
