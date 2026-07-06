"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Globe, LogOut, Menu, ShoppingBag, User, X } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export function Header({ clientUser }: { clientUser: { name: string } | null }) {
  const { t, locale, setLocale } = useLanguage();
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: Array<{ href: string; label: string }> = [
    { href: "/", label: t.nav.home },
    { href: "/how-it-works", label: t.nav.howItWorks },
    { href: "/for-buyers", label: t.nav.forBuyers },
    { href: "/categories", label: t.nav.categories },
    { href: "/about", label: t.nav.about },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
            J
          </span>
          {t.meta.siteName}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "text-accent" : "text-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "fa" : "en")}
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground sm:flex"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
            {locale === "en" ? "فارسی" : "EN"}
          </button>

          {clientUser ? (
            <div className="hidden items-center gap-1 sm:flex">
              <span className="flex items-center gap-1.5 px-2 text-sm font-medium text-foreground">
                <User className="h-4 w-4" />
                {clientUser.name}
              </span>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                {t.nav.logout}
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-1 sm:flex">
              <Link
                href="/login"
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {t.nav.login}
              </Link>
              <Link
                href="/register"
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {t.nav.register}
              </Link>
            </div>
          )}

          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5"
            aria-label={t.nav.cart}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 ? (
              <span className="absolute -top-0.5 end-0 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                {itemCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5 lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-border bg-background px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === item.href ? "bg-accent/10 text-accent" : "text-muted hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "fa" : "en")}
              className="mt-1 flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-start text-sm font-medium text-muted hover:bg-foreground/5 hover:text-foreground sm:hidden"
            >
              <Globe className="h-4 w-4" />
              {locale === "en" ? "فارسی" : "English"}
            </button>

            {clientUser ? (
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-start text-sm font-medium text-muted hover:bg-foreground/5 hover:text-foreground sm:hidden"
              >
                <LogOut className="h-4 w-4" />
                {t.nav.logout}
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-foreground/5 hover:text-foreground sm:hidden"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-foreground/5 hover:text-foreground sm:hidden"
                >
                  {t.nav.register}
                </Link>
              </>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
