"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export function HowItWorksCondensed() {
  const { t } = useLanguage();
  const { title, steps } = t.home.howItWorks;

  return (
    <section className="border-b border-border bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={title} />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground font-semibold">
                {index + 1}
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/how-it-works" variant="secondary">
            {t.common.seeAll}
          </Button>
        </div>
      </div>
    </section>
  );
}
