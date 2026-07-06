"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import type { ProductWithRelations } from "@/types";

type ImageRow = { url: string; alt: string; colorName: string; colorHex: string };
type SpecRow = { labelEn: string; labelFa: string; valueEn: string; valueFa: string };

const emptyImage: ImageRow = { url: "", alt: "", colorName: "", colorHex: "" };
const emptySpec: SpecRow = { labelEn: "", labelFa: "", valueEn: "", valueFa: "" };

export function ProductForm({ product }: { product?: ProductWithRelations }) {
  const { t } = useLanguage();
  const router = useRouter();
  const f = t.admin.form;
  const isEdit = Boolean(product);

  const [images, setImages] = useState<ImageRow[]>(
    product && product.images.length > 0
      ? product.images.map((image) => ({
          url: image.url,
          alt: image.alt,
          colorName: image.colorName ?? "",
          colorHex: image.colorHex ?? "",
        }))
      : [emptyImage]
  );
  const [specs, setSpecs] = useState<SpecRow[]>(
    product && product.specs.length > 0
      ? product.specs.map((spec) => ({
          labelEn: spec.labelEn,
          labelFa: spec.labelFa,
          valueEn: spec.valueEn,
          valueFa: spec.valueFa,
        }))
      : [emptySpec]
  );
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
      taglineEn: String(data.get("taglineEn") ?? ""),
      taglineFa: String(data.get("taglineFa") ?? ""),
      descriptionEn: String(data.get("descriptionEn") ?? ""),
      descriptionFa: String(data.get("descriptionFa") ?? ""),
      price: Number(data.get("price")),
      compareAtPrice: data.get("compareAtPrice") ? Number(data.get("compareAtPrice")) : null,
      category: String(data.get("category") ?? ""),
      stock: Number(data.get("stock")),
      featured: data.get("featured") === "on",
      images: images
        .filter((image) => image.url.trim())
        .map((image) => ({
          url: image.url.trim(),
          alt: image.alt.trim(),
          colorName: image.colorName.trim() || null,
          colorHex: image.colorHex.trim() || null,
        })),
      specs: specs
        .filter((spec) => spec.labelEn.trim() && spec.valueEn.trim())
        .map((spec) => ({
          labelEn: spec.labelEn.trim(),
          labelFa: spec.labelFa.trim(),
          valueEn: spec.valueEn.trim(),
          valueFa: spec.valueFa.trim(),
        })),
    };

    const res = await fetch(
      isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(typeof body?.error === "string" ? body.error : "Could not save product");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-foreground">{isEdit ? f.titleEdit : f.titleNew}</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label={f.nameEn} name="nameEn" defaultValue={product?.nameEn} required />
          <FormInput label={f.nameFa} name="nameFa" defaultValue={product?.nameFa} required dir="rtl" />
          <FormInput label={f.slug} name="slug" defaultValue={product?.slug} required />
          <FormInput label={f.category} name="category" defaultValue={product?.category ?? "smartphones"} required />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label={f.taglineEn} name="taglineEn" defaultValue={product?.taglineEn} required />
          <FormInput label={f.taglineFa} name="taglineFa" defaultValue={product?.taglineFa} required dir="rtl" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormTextarea label={f.descriptionEn} name="descriptionEn" defaultValue={product?.descriptionEn} required />
          <FormTextarea label={f.descriptionFa} name="descriptionFa" defaultValue={product?.descriptionFa} required dir="rtl" />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <FormInput label={f.price} name="price" type="number" step="0.01" defaultValue={product?.price} required />
          <FormInput
            label={f.compareAtPrice}
            name="compareAtPrice"
            type="number"
            step="0.01"
            defaultValue={product?.compareAtPrice ?? ""}
          />
          <FormInput label={f.stock} name="stock" type="number" defaultValue={product?.stock ?? 10} required />
        </div>

        <label className="flex items-center gap-2.5 text-sm font-medium text-foreground">
          <input type="checkbox" name="featured" defaultChecked={product?.featured ?? true} className="h-4 w-4 rounded border-border" />
          {f.featured}
        </label>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">{f.images}</h2>
            <button
              type="button"
              onClick={() => setImages((rows) => [...rows, emptyImage])}
              className="flex items-center gap-1 text-sm text-accent hover:opacity-80"
            >
              <Plus className="h-4 w-4" />
              {f.addImage}
            </button>
          </div>
          <div className="mt-3 space-y-4">
            {images.map((image, index) => (
              <div key={index} className="grid gap-3 rounded-xl border border-border p-4 sm:grid-cols-2">
                <input
                  value={image.url}
                  onChange={(event) =>
                    setImages((rows) =>
                      rows.map((row, i) => (i === index ? { ...row, url: event.target.value } : row))
                    )
                  }
                  placeholder={f.imageUrl}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm sm:col-span-2"
                />
                <input
                  value={image.alt}
                  onChange={(event) =>
                    setImages((rows) =>
                      rows.map((row, i) => (i === index ? { ...row, alt: event.target.value } : row))
                    )
                  }
                  placeholder={f.imageAlt}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
                />
                <input
                  value={image.colorName}
                  onChange={(event) =>
                    setImages((rows) =>
                      rows.map((row, i) => (i === index ? { ...row, colorName: event.target.value } : row))
                    )
                  }
                  placeholder={f.colorName}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
                />
                <div className="flex items-center gap-2 sm:col-span-2">
                  <input
                    value={image.colorHex}
                    onChange={(event) =>
                      setImages((rows) =>
                        rows.map((row, i) => (i === index ? { ...row, colorHex: event.target.value } : row))
                      )
                    }
                    placeholder={f.colorHex}
                    className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setImages((rows) => rows.filter((_, i) => i !== index))}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-red-500/10 hover:text-red-500"
                    aria-label={f.removeImage}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">{f.specs}</h2>
            <button
              type="button"
              onClick={() => setSpecs((rows) => [...rows, emptySpec])}
              className="flex items-center gap-1 text-sm text-accent hover:opacity-80"
            >
              <Plus className="h-4 w-4" />
              {f.addSpec}
            </button>
          </div>
          <div className="mt-3 space-y-4">
            {specs.map((spec, index) => (
              <div key={index} className="grid gap-3 rounded-xl border border-border p-4 sm:grid-cols-2">
                <input
                  value={spec.labelEn}
                  onChange={(event) =>
                    setSpecs((rows) =>
                      rows.map((row, i) => (i === index ? { ...row, labelEn: event.target.value } : row))
                    )
                  }
                  placeholder={f.specLabelEn}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
                />
                <input
                  value={spec.labelFa}
                  onChange={(event) =>
                    setSpecs((rows) =>
                      rows.map((row, i) => (i === index ? { ...row, labelFa: event.target.value } : row))
                    )
                  }
                  placeholder={f.specLabelFa}
                  dir="rtl"
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
                />
                <input
                  value={spec.valueEn}
                  onChange={(event) =>
                    setSpecs((rows) =>
                      rows.map((row, i) => (i === index ? { ...row, valueEn: event.target.value } : row))
                    )
                  }
                  placeholder={f.specValueEn}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
                />
                <div className="flex items-center gap-2">
                  <input
                    value={spec.valueFa}
                    onChange={(event) =>
                      setSpecs((rows) =>
                        rows.map((row, i) => (i === index ? { ...row, valueFa: event.target.value } : row))
                      )
                    }
                    placeholder={f.specValueFa}
                    dir="rtl"
                    className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setSpecs((rows) => rows.filter((_, i) => i !== index))}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-red-500/10 hover:text-red-500"
                    aria-label={f.removeSpec}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <div className="flex gap-3">
          <Button type="submit" size="lg" disabled={saving}>
            {saving ? f.saving : f.save}
          </Button>
          <Button href="/admin" variant="secondary" size="lg">
            {f.cancel}
          </Button>
        </div>
      </form>
    </div>
  );
}
