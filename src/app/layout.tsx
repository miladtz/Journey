import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { LanguageProvider, LANGUAGE_COOKIE_NAME } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import type { Locale } from "@/lib/translations";
import { auth } from "@/auth";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "جورنی — فناوری برتر، بررسی‌شده و تضمینی",
  description:
    "جورنی هر محصول را خودش انتخاب و بررسی می‌کند، قیمتی شفاف تعیین می‌کند و از لحظه خرید تا رسیدن به دستتان پاسخگوست. شروع با آیفون ۱۷ پرو مکس.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLocale: Locale = cookieStore.get(LANGUAGE_COOKIE_NAME)?.value === "en" ? "en" : "fa";
  const dir = initialLocale === "fa" ? "rtl" : "ltr";
  const session = await auth();
  const clientUser = session?.user.role === "CLIENT" ? { name: session.user.name ?? "" } : null;

  return (
    <html
      lang={initialLocale}
      dir={dir}
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider initialLocale={initialLocale}>
          <CartProvider>
            <Header clientUser={clientUser} />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
