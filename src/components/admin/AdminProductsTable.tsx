"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { ProductWithRelations } from "@/types";

export function AdminProductsTable({ products }: { products: ProductWithRelations[] }) {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const d = t.admin.dashboard;

  async function handleDelete(id: string) {
    if (!window.confirm(d.deleteConfirm)) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{d.title}</h1>
          <p className="mt-1 text-sm text-muted">{d.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button href="/admin/products/new" size="sm">
            <Plus className="h-4 w-4" />
            {d.addProduct}
          </Button>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm text-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            {t.nav.logout}
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-surface">
        {products.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">{d.empty}</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-start text-muted">
                <th className="px-5 py-3 text-start font-medium">{d.title}</th>
                <th className="px-5 py-3 text-start font-medium">{d.colPrice}</th>
                <th className="px-5 py-3 text-start font-medium">{d.colStock}</th>
                <th className="px-5 py-3 text-start font-medium">{d.colStatus}</th>
                <th className="px-5 py-3 text-end font-medium">{d.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="flex items-center gap-3 px-5 py-3">
                    {product.images[0] ? (
                      <img src={product.images[0].url} alt="" className="h-10 w-10 object-contain" />
                    ) : null}
                    <span className="font-medium text-foreground">
                      {locale === "fa" ? product.nameFa : product.nameEn}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-foreground">
                    {t.common.currency}
                    {product.price.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-foreground">{product.stock}</td>
                  <td className="px-5 py-3">
                    <Badge tone={product.featured ? "accent" : "neutral"}>
                      {product.featured ? d.featured : d.hidden}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button href={`/admin/products/${product.id}/edit`} variant="secondary" size="sm">
                        <Pencil className="h-3.5 w-3.5" />
                        {d.edit}
                      </Button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-red-500/10 hover:text-red-500"
                        aria-label={d.delete}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
