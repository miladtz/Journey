"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const quickLinks: Array<{ href: string; label: string }> = [
    { href: "/how-it-works", label: t.nav.howItWorks },
    { href: "/for-buyers", label: t.nav.forBuyers },
    { href: "/categories", label: t.nav.categories },
    { href: "/pricing", label: t.nav.pricing },
  ];

  const companyLinks: Array<{ href: string; label: string }> = [
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
    { href: "/admin/login", label: t.nav.admin },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
                J
              </span>
              {t.meta.siteName}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">{t.footer.tagline}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">{t.footer.quickLinks}</h3>
            <ul className="mt-3 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">{t.footer.company}</h3>
            <ul className="mt-3 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted">
          © {year} {t.meta.siteName}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
