import { clsx } from "clsx";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "text-start ms-0",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium tracking-wide text-accent uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-lg text-muted text-balance">{subtitle}</p>
      ) : null}
    </div>
  );
}
