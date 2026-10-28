import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TimelineVisualizer from "@/components/TimelineVisualizer";
import { Footer } from "@/components/Footer";
import { LOCALE_PAGES, SITE_URL, homeAlternates, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const p = LOCALE_PAGES[lang];
  const url = `${SITE_URL}/${lang}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: url, languages: homeAlternates() },
    icons: { icon: "/favicon.ico" },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url,
      siteName: "Google Maps Timeline Visualizer",
      locale: p.ogLocale,
      type: "website",
      images: [{ url: "/ogimage.jpg", width: 1200, height: 630, alt: p.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: p.metaTitle,
      description: p.metaDescription,
      images: ["/ogimage.jpg"],
    },
  };
}

const ENGLISH_GUIDES = [
  { href: "/export-google-maps-timeline", title: "How to Export Google Maps Timeline Data (Android and iPhone)" },
  { href: "/timeline-json-viewer", title: "Timeline.json Viewer: Open Your Google Timeline JSON File" },
  { href: "/blog/export-google-timeline-data", title: "Step by Step Guide to Export Your Google Timeline Data (iPhone screenshots)" },
];

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const p = LOCALE_PAGES[lang];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: p.h1,
      url: `${SITE_URL}/${lang}`,
      inLanguage: lang,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any (web browser)",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: p.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <main className="container mx-auto p-4 md:p-6 min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h1 className="text-3xl font-bold mb-3">{p.h1}</h1>
        <p className="text-muted-foreground max-w-3xl mb-2">{p.intro}</p>

        <TimelineVisualizer t={p.ui} locale={lang} intl={p.intl} />

        <section className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">{p.howToTitle}</h2>
          <div className="grid gap-4">
            {p.steps.map((s) => (
              <div key={s.title} className="bg-card p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">{p.faqTitle}</h2>
          <div className="space-y-6">
            {p.faq.map((f) => (
              <div key={f.q} className="bg-card p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">{p.englishGuides}</h2>
          <ul className="space-y-2 text-center">
            {ENGLISH_GUIDES.map((g) => (
              <li key={g.href}>
                <a href={g.href} hrefLang="en" className="text-primary hover:underline">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
