"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";

function RegisterForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const r = t.auth.register;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
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

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(typeof body?.error === "string" ? body.error : r.genericError);
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError(r.genericError);
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground">{r.title}</h1>
        <p className="mt-2 text-sm text-muted">{r.subtitle}</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <FormInput label={r.firstName} name="firstName" required />
          <FormInput label={r.lastName} name="lastName" required />
        </div>
        <FormInput label={r.email} name="email" type="email" required />
        <FormInput label={r.phone} name="phone" type="tel" required />
        <FormInput label={r.password} name="password" type="password" minLength={8} required />
        <FormInput label={r.address} name="address" />
        <div className="grid grid-cols-2 gap-5">
          <FormInput label={r.city} name="city" />
          <FormInput label={r.postalCode} name="postalCode" />
        </div>
        <FormInput label={r.country} name="country" />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? r.submitting : r.submit}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        {r.haveAccount}{" "}
        <Link href="/login" className="font-medium text-accent hover:underline">
          {r.signIn}
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
