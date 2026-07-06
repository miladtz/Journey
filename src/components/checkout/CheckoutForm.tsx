"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";

type ShippingValues = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export function CheckoutForm({ initialValues }: { initialValues: ShippingValues }) {
  const { t, locale } = useLanguage();
  const { cart, clearCart } = useCart();
  const { fields } = t.checkout;
  const [status, setStatus] = useState<"idle" | "sending" | "placed">("idle");
  const [error, setError] = useState<string | null>(null);

  if (status === "placed") {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6 lg:px-8">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h1 className="mt-6 text-2xl font-semibold text-foreground">{t.checkout.orderPlacedTitle}</h1>
        <p className="mt-3 text-muted">{t.checkout.orderPlacedDesc}</p>
        <Button href="/" className="mt-8">
          {t.checkout.backHome}
        </Button>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="text-muted">{t.cart.empty}</p>
        <Button href="/categories" className="mt-6">
          {t.cart.emptyCta}
        </Button>
      </div>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);
    const data = new FormData(event.currentTarget);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: data.get("address"),
        city: data.get("city"),
        postalCode: data.get("postalCode"),
        country: data.get("country"),
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(typeof body?.error === "string" ? body.error : "Could not place your order.");
      setStatus("idle");
      return;
    }

    await clearCart();
    setStatus("placed");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{t.checkout.title}</h1>
        <p className="mt-4 text-lg text-muted">{t.checkout.subtitle}</p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="space-y-5 lg:col-span-3">
          <FormInput label={fields.address} name="address" defaultValue={initialValues.address} required />
          <div className="grid grid-cols-2 gap-5">
            <FormInput label={fields.city} name="city" defaultValue={initialValues.city} required />
            <FormInput label={fields.postalCode} name="postalCode" defaultValue={initialValues.postalCode} required />
          </div>
          <FormInput label={fields.country} name="country" defaultValue={initialValues.country} required />
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
            {status === "sending" ? t.common.sending : t.checkout.placeOrder}
          </Button>
        </form>

        <div className="rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground">{t.cart.title}</h2>
          <ul className="mt-4 space-y-4">
            {cart.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-foreground">
                  {locale === "fa" ? item.nameFa : item.nameEn} × {item.quantity}
                </span>
                <span className="shrink-0 text-muted">
                  {t.common.currency}
                  {(item.price * item.quantity).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-base font-semibold text-foreground">
            <span>{t.common.total}</span>
            <span>
              {t.common.currency}
              {cart.subtotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
