"use client";

import { BadgeCheck, Tags, LifeBuoy } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/components/ui/SectionHeader";

const icons = [BadgeCheck, Tags, LifeBuoy];

export function SolutionSection() {
  const { t } = useLanguage();
  const { title, subtitle, points } = t.home.solution;

  return (
    <section className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {points.map((point, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div key={point.title} className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm text-muted">{point.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
