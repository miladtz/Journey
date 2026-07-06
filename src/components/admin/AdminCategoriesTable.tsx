"use client";

import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CATEGORY_ICONS } from "@/components/categories/CategoryCard";
import type { Category } from "@/generated/prisma/client";

export function AdminCategoriesTable({
  categories,
  productCounts,
}: {
  categories: Category[];
  productCounts: Record<string, number>;
}) {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const d = t.admin.categories;

  async function handleDelete(id: string) {
    if (!window.confirm(d.deleteConfirm)) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
      return;
    }
    const body = await res.json().catch(() => null);
    window.alert(typeof body?.error === "string" ? body.error : "Could not delete category");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{d.title}</h1>
          <p className="mt-1 text-sm text-muted">{d.subtitle}</p>
        </div>
        <Button href="/admin/categories/new" size="sm">
          <Plus className="h-4 w-4" />
          {d.addCategory}
        </Button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-surface">
        {categories.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">{d.empty}</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-start text-muted">
                <th className="px-5 py-3 text-start font-medium">{d.colName}</th>
                <th className="px-5 py-3 text-start font-medium">{d.colSlug}</th>
                <th className="px-5 py-3 text-start font-medium">{d.colProducts}</th>
                <th className="px-5 py-3 text-start font-medium">{d.colStatus}</th>
                <th className="px-5 py-3 text-end font-medium">{d.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((category) => {
                const Icon = CATEGORY_ICONS[category.icon] ?? CATEGORY_ICONS.Package;
                const count = productCounts[category.slug] ?? 0;
                return (
                  <tr key={category.id}>
                    <td className="flex items-center gap-3 px-5 py-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-foreground">
                        {locale === "fa" ? category.nameFa : category.nameEn}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-muted">{category.slug}</td>
                    <td className="px-5 py-3 text-foreground">{count}</td>
                    <td className="px-5 py-3">
                      <Badge tone={count > 0 ? "success" : "neutral"}>
                        {count > 0 ? d.live : d.comingSoon}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button href={`/admin/categories/${category.id}/edit`} variant="secondary" size="sm">
                          <Pencil className="h-3.5 w-3.5" />
                          {d.edit}
                        </Button>
                        <button
                          type="button"
                          onClick={() => handleDelete(category.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-red-500/10 hover:text-red-500"
                          aria-label={d.delete}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
