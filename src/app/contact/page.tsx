"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const { t } = useLanguage();
  const { hero, form, success, error } = t.contact;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const data = new FormData(event.currentTarget);

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        phone: data.get("phone") || undefined,
        message: data.get("message"),
      }),
    });

    if (res.ok) {
      setStatus("sent");
      event.currentTarget.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{hero.title}</h1>
        <p className="mt-6 text-lg text-muted text-balance">{hero.subtitle}</p>
      </div>

      {status === "sent" ? (
        <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-10 text-center">
          <CheckCircle2 className="h-10 w-10 text-accent" />
          <p className="text-base text-foreground">{success}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-12 space-y-5">
          <FormInput label={form.name} name="name" required />
          <FormInput label={form.email} name="email" type="email" required />
          <FormInput label={form.phone} name="phone" type="tel" />
          <FormTextarea label={form.message} name="message" required />
          {status === "error" ? <p className="text-sm text-red-500">{error}</p> : null}
          <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
            {status === "sending" ? t.common.sending : form.submit}
          </Button>
        </form>
      )}
    </div>
  );
}
