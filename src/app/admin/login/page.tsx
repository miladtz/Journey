"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { title, subtitle, email, password, submit, invalidCredentials } = t.admin.login;
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
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <FormInput label={email} name="email" type="email" required />
        <FormInput label={password} name="password" type="password" required />
        {error ? <p className="text-sm text-red-500">{invalidCredentials}</p> : null}
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? t.common.sending : submit}
        </Button>
      </form>
    </div>
  );
}
