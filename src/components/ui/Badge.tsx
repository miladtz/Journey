import type { ReactNode } from "react";
import { clsx } from "clsx";

type Tone = "neutral" | "accent" | "success" | "warning";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-foreground/5 text-foreground border-border",
  accent: "bg-accent/10 text-accent border-accent/20",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
