"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/Badge";

export default function HowItWorksPage() {
  const { t } = useLanguage();
  const { hero, steps } = t.howItWorksPage;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Badge tone="accent">{hero.eyebrow}</Badge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{hero.title}</h1>
        <p className="mt-6 text-lg text-muted text-balance">{hero.subtitle}</p>
      </div>

      <ol className="mx-auto mt-16 max-w-3xl space-y-8">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-5 rounded-2xl border border-border bg-surface p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground font-semibold">
              {index + 1}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{step.title}</h2>
              <p className="mt-1.5 text-sm text-muted">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
