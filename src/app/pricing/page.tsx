"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function PricingPage() {
  const { t } = useLanguage();
  const { hero, sections, faqTitle, faq } = t.pricing;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{hero.title}</h1>
        <p className="mt-6 text-lg text-muted text-balance">{hero.subtitle}</p>
      </div>

      <div className="mt-16 space-y-6">
        {sections.map((section, index) => (
          <div key={section.title} className="flex gap-5 rounded-2xl border border-border bg-surface p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 font-semibold text-accent">
              {index + 1}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              <p className="mt-1.5 text-sm text-muted">{section.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-semibold text-foreground">{faqTitle}</h2>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
          {faq.map((item) => (
            <details key={item.q} className="group p-6">
              <summary className="cursor-pointer list-none text-base font-medium text-foreground marker:content-none">
                {item.q}
              </summary>
              <p className="mt-3 text-sm text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
