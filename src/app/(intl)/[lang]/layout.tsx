import { notFound } from "next/navigation";
import Analytics from "@/components/Analytics";
import { geistSans, geistMono } from "@/lib/fonts";
import { LOCALES, isLocale } from "@/lib/i18n";
import "../../globals.css";

// Only the locales in LOCALES exist; every other /<segment> is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/** Root layout for the localized tool pages, so <html lang> matches the page language. */
export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang}>
      <head>
        <Analytics />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
