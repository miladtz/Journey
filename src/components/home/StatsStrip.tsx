"use client";

import { useLanguage } from "@/context/LanguageContext";

export function StatsStrip() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-border bg-accent/5 py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {t.home.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{stat.value}</p>
            <p className="mt-1.5 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
