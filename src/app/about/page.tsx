"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/Badge";

export default function AboutPage() {
  const { t } = useLanguage();
  const { hero, missionTitle, mission, values } = t.about;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Badge tone="accent">{hero.eyebrow}</Badge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{hero.title}</h1>
        <p className="mt-6 text-lg text-muted text-balance">{hero.subtitle}</p>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-foreground">{missionTitle}</h2>
        <div className="mt-5 space-y-4">
          {mission.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
            <p className="mt-2 text-sm text-muted">{value.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
