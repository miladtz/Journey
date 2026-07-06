"use client";

import { Check, User, Building2, Store } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/Badge";

const icons = [User, Building2, Store];

export default function ForBuyersPage() {
  const { t } = useLanguage();
  const { hero, segments } = t.forBuyers;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Badge tone="accent">{hero.eyebrow}</Badge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{hero.title}</h1>
        <p className="mt-6 text-lg text-muted text-balance">{hero.subtitle}</p>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {segments.map((segment, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div key={segment.title} className="rounded-2xl border border-border bg-surface p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-foreground">{segment.title}</h2>
              <p className="mt-2 text-sm text-muted">{segment.desc}</p>
              <ul className="mt-5 space-y-2.5">
                {segment.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
