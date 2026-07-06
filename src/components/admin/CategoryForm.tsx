"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { CATEGORY_ICONS } from "@/components/categories/CategoryCard";
import type { Category } from "@/generated/prisma/client";

export function CategoryForm({ category }: { category?: Category }) {
  const { t } = useLanguage();
  const router = useRouter();
  const f = t.admin.categoryForm;
  const isEdit = Boolean(category);

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const data = new FormData(event.currentTarget);
    const payload = {
      slug: String(data.get("slug") ?? ""),
      nameEn: String(data.get("nameEn") ?? ""),
      nameFa: String(data.get("nameFa") ?? ""),
      descEn: String(data.get("descEn") ?? ""),
      descFa: String(data.get("descFa") ?? ""),
      icon: String(data.get("icon") ?? "Package"),
    };

    const res = await fetch(
      isEdit ? `/api/admin/categories/${category!.id}` : "/api/admin/categories",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(typeof body?.error === "string" ? body.error : "Could not save category");
      return;
    }

    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-foreground">{isEdit ? f.titleEdit : f.titleNew}</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label={f.nameEn} name="nameEn" defaultValue={category?.nameEn} required />
          <FormInput label={f.nameFa} name="nameFa" defaultValue={category?.nameFa} required dir="rtl" />
        </div>

        <FormInput label={f.slug} name="slug" defaultValue={category?.slug} required />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormTextarea label={f.descriptionEn} name="descEn" defaultValue={category?.descEn} />
          <FormTextarea label={f.descriptionFa} name="descFa" defaultValue={category?.descFa} dir="rtl" />
        </div>

        <div>
          <label htmlFor="icon" className="mb-1.5 block text-sm font-medium text-foreground">
            {f.icon}
          </label>
          <select
            id="icon"
            name="icon"
            defaultValue={category?.icon ?? "Package"}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
          >
            {Object.keys(CATEGORY_ICONS).map((iconName) => (
              <option key={iconName} value={iconName}>
                {iconName}
              </option>
            ))}
          </select>
        </div>

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <div className="flex gap-3">
          <Button type="submit" size="lg" disabled={saving}>
            {saving ? f.saving : f.save}
          </Button>
          <Button href="/admin/categories" variant="secondary" size="lg">
            {f.cancel}
          </Button>
        </div>
      </form>
    </div>
  );
}
