"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { translations, type Locale, type Translations } from "@/lib/translations";

type LanguageContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Translations;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const COOKIE_NAME = "lang";

export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // <html> is owned by the server-rendered root layout, so a client toggle
  // has to reach it imperatively via the DOM instead of through React state.
  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = next;
    document.documentElement.dir = next === "fa" ? "rtl" : "ltr";
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir: locale === "fa" ? "rtl" : "ltr",
      t: translations[locale],
      setLocale,
    }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

export { COOKIE_NAME as LANGUAGE_COOKIE_NAME };
