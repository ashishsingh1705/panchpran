import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Devanagari, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, type Locale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const latin = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-latin",
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-deva",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://panchpranvikastrust.org"),
  title: {
    default: "Panch Pran Vikas Trust · पंच प्रण विकास ट्रस्ट",
    template: "%s · Panch Pran Vikas Trust",
  },
  description:
    "Five commitments, one shared vision for a stronger, healthier and self-reliant India: education, self-reliance, environment, women empowerment and health.",
  icons: { icon: "/logo.png" },
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(params.locale as Locale)) {
    notFound();
  }
  const locale = params.locale as Locale;

  return (
    <html lang={locale} className={`${latin.variable} ${devanagari.variable} ${mono.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          {locale === "hi" ? "मुख्य सामग्री पर जाएं" : "Skip to main content"}
        </a>
        <Header locale={locale} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
