"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";

export function AdminClientForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const f = t.admin.clientForm;

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const data = new FormData(event.currentTarget);
    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      password: data.get("password"),
      address: data.get("address"),
      city: data.get("city"),
      postalCode: data.get("postalCode"),
      country: data.get("country"),
    };

    const res = await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(typeof body?.error === "string" ? body.error : "Could not save client");
      return;
    }

    router.push("/admin/clients");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-foreground">{f.title}</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label={f.firstName} name="firstName" required />
          <FormInput label={f.lastName} name="lastName" required />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label={f.email} name="email" type="email" required />
          <FormInput label={f.phone} name="phone" type="tel" required />
        </div>

        <FormInput label={f.password} name="password" type="password" minLength={8} required />

        <FormInput label={f.address} name="address" />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label={f.city} name="city" />
          <FormInput label={f.postalCode} name="postalCode" />
        </div>

        <FormInput label={f.country} name="country" />

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <div className="flex gap-3">
          <Button type="submit" size="lg" disabled={saving}>
            {saving ? f.saving : f.save}
          </Button>
          <Button href="/admin/clients" variant="secondary" size="lg">
            {f.cancel}
          </Button>
        </div>
      </form>
    </div>
  );
}
