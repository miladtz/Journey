import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { clsx } from "clsx";

const fieldClasses =
  "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  className?: string;
};

export function FormInput({
  label,
  name,
  error,
  className,
  ...rest
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <input
        id={name}
        name={name}
        className={clsx(fieldClasses, error && "border-red-500 focus:ring-red-500", className)}
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error ? <span className="mt-1.5 block text-xs text-red-500">{error}</span> : null}
    </label>
  );
}

export function FormTextarea({
  label,
  name,
  error,
  className,
  rows = 5,
  ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className={clsx(fieldClasses, "resize-none", error && "border-red-500 focus:ring-red-500", className)}
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error ? <span className="mt-1.5 block text-xs text-red-500">{error}</span> : null}
    </label>
  );
}
