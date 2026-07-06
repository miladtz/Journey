"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const l = t.auth.login;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(false);
    const data = new FormData(event.currentTarget);

    const result = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError(true);
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground">{l.title}</h1>
        <p className="mt-2 text-sm text-muted">{l.subtitle}</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <FormInput label={l.email} name="email" type="email" required />
        <FormInput label={l.password} name="password" type="password" required />
        {error ? <p className="text-sm text-red-500">{l.invalidCredentials}</p> : null}
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? l.submitting : l.submit}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        {l.noAccount}{" "}
        <Link href="/register" className="font-medium text-accent hover:underline">
          {l.register}
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
