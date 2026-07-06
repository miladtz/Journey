"use client";

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { t, locale } = useLanguage();
  const { cart, isLoading, updateQuantity, removeItem } = useCart();

  if (!isLoading && cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted" />
        <h1 className="mt-6 text-2xl font-semibold text-foreground">{t.cart.title}</h1>
        <p className="mt-2 text-muted">{t.cart.empty}</p>
        <Button href="/categories" className="mt-8">
          {t.cart.emptyCta}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">{t.cart.title}</h1>

      <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-surface">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-5 sm:gap-6">
            {item.image ? (
              <img src={item.image} alt="" className="h-20 w-20 shrink-0 object-contain" />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">
                {locale === "fa" ? item.nameFa : item.nameEn}
              </p>
              {item.color ? <p className="text-sm text-muted">{item.color}</p> : null}
              <p className="mt-1 text-sm text-muted">
                {t.common.currency}
                {item.price.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center rounded-full border border-border">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="flex h-9 w-9 items-center justify-center text-muted hover:text-foreground"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                className="flex h-9 w-9 items-center justify-center text-muted hover:text-foreground"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="hidden w-24 shrink-0 text-end font-medium text-foreground sm:block">
              {t.common.currency}
              {(item.price * item.quantity).toLocaleString()}
            </p>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="shrink-0 text-muted hover:text-red-500"
              aria-label={t.cart.remove}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="flex w-full max-w-xs items-center justify-between text-lg">
          <span className="font-medium text-foreground">{t.cart.subtotal}</span>
          <span className="font-semibold text-foreground">
            {t.common.currency}
            {cart.subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex w-full max-w-xs flex-col gap-3">
          <Button href="/checkout" size="lg">
            {t.cart.proceedToCheckout}
          </Button>
          <Button href="/categories" variant="secondary">
            {t.cart.continueShopping}
          </Button>
        </div>
      </div>
    </div>
  );
}
