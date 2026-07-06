"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/context/LanguageContext";

export function AdminNav() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isProducts = pathname === "/admin" || pathname.startsWith("/admin/products");
  const isCategories = pathname.startsWith("/admin/categories");

  return (
    <div className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <nav className="flex gap-6">
          <Link
            href="/admin"
            className={clsx(
              "-mb-px border-b-2 py-4 text-sm font-medium",
              isProducts ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground"
            )}
          >
            {t.admin.nav.products}
          </Link>
          <Link
            href="/admin/categories"
            className={clsx(
              "-mb-px border-b-2 py-4 text-sm font-medium",
              isCategories ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground"
            )}
          >
            {t.admin.nav.categories}
          </Link>
        </nav>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-1.5 py-4 text-sm text-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          {t.nav.logout}
        </button>
      </div>
    </div>
  );
}
