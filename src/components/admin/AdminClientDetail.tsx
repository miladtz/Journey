"use client";

import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import type { ClientWithOrders } from "@/types";

export function AdminClientDetail({ client }: { client: ClientWithOrders }) {
  const { t, locale } = useLanguage();
  const c = t.admin.clients;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Button href="/admin/clients" variant="ghost" size="sm">
        <ArrowLeft className="h-4 w-4" />
        {c.backToList}
      </Button>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <h1 className="text-xl font-semibold text-foreground">
          {client.firstName} {client.lastName}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {c.memberSince} {new Date(client.createdAt).toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US")}
        </p>

        <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">{c.colEmail}</dt>
            <dd className="mt-0.5 text-foreground">{client.email}</dd>
          </div>
          <div>
            <dt className="text-muted">{c.colPhone}</dt>
            <dd className="mt-0.5 text-foreground">{client.phone}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-muted">{t.checkout.fields.address}</dt>
            <dd className="mt-0.5 text-foreground">
              {[client.address, client.city, client.postalCode, client.country].filter(Boolean).join(", ") || "—"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">{c.ordersTitle}</h2>

        {client.orders.length === 0 ? (
          <p className="mt-4 text-sm text-muted">{c.noOrders}</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {client.orders.map((order) => (
              <li key={order.id} className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm text-muted">
                    {new Date(order.createdAt).toLocaleString(locale === "fa" ? "fa-IR" : "en-US")}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {c.orderTotal}: {t.common.currency}
                    {order.subtotal.toLocaleString()}
                  </span>
                </div>
                <ul className="mt-3 divide-y divide-border text-sm">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between py-2">
                      <span className="text-foreground">
                        {locale === "fa" ? item.nameFa : item.nameEn} × {item.quantity}
                        {item.color ? ` (${item.color})` : ""}
                      </span>
                      <span className="text-muted">
                        {t.common.currency}
                        {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted">
                  {[order.address, order.city, order.postalCode, order.country].filter(Boolean).join(", ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
