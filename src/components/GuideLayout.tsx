import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/i18n";

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
}

export const GUIDES: { slug: string; title: string }[] = [
  { slug: "export-google-maps-timeline", title: "How to Export Google Maps Timeline Data (Android and iPhone)" },
  { slug: "timeline-json-viewer", title: "Timeline.json Viewer: Open Your Google Timeline JSON File" },
  { slug: "google-maps-timeline", title: "Google Maps Timeline Viewer: See Your Google Timeline on a Map" },
  { slug: "timeline-visualization", title: "Timeline Visualization of Your Google Location History" },
];

export function guideMetadata(m: GuideMeta): Metadata {
  const url = `${SITE_URL}/${m.slug}`;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: url },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: "Google Maps Timeline Visualizer",
      type: "article",
      publishedTime: m.datePublished,
      images: [{ url: "/ogimage.jpg", width: 1200, height: 630, alt: m.title }],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: ["/ogimage.jpg"] },
  };
}

/** Shared shell for the English guide pages: h1, body, a link back to the tool, related guides, FAQ schema. */
export function GuideLayout({
  meta,
  faq,
  children,
}: {
  meta: GuideMeta;
  faq: { q: string; a: string }[];
  children: React.ReactNode;
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: meta.title,
      description: meta.description,
      datePublished: meta.datePublished,
      dateModified: meta.datePublished,
      mainEntityOfPage: `${SITE_URL}/${meta.slug}`,
      image: `${SITE_URL}/ogimage.jpg`,
      author: { "@type": "Person", name: "Quanlai Li", url: "https://quanl.ai" },
      publisher: { "@type": "Organization", name: "Google Maps Timeline Visualizer", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <main className="container mx-auto p-4 md:p-6 max-w-3xl min-h-screen">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <nav className="text-sm mb-4">
          <Link href="/" className="text-primary hover:underline">
            Google Maps Timeline Visualizer
          </Link>
        </nav>
        <h1 className="text-3xl font-bold mb-4">{meta.title}</h1>

        <div className="guide-body space-y-4 leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_code]:bg-secondary [&_code]:px-1 [&_code]:rounded [&_pre]:bg-secondary [&_pre]:p-3 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:text-sm [&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_th]:border-b [&_th]:p-2 [&_td]:border-b [&_td]:p-2 [&_a]:text-primary [&_a]:underline">
          {children}
        </div>

        <div className="my-10 p-6 rounded-lg bg-card shadow text-center">
          <p className="text-lg font-semibold mb-3">Have your file? See it on a map now.</p>
          <Link
            href="/"
            className="inline-block bg-primary text-primary-foreground px-5 py-2 rounded-md font-medium hover:opacity-90"
          >
            Open the Timeline Visualizer
          </Link>
          <p className="text-xs text-muted-foreground mt-3">Free. Runs in your browser. Your file is never uploaded.</p>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {faq.map((f) => (
              <div key={f.q} className="bg-card p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-1">{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold mb-3">Related guides</h2>
          <ul className="space-y-2">
            {GUIDES.filter((g) => g.slug !== meta.slug).map((g) => (
              <li key={g.slug}>
                <Link href={`/${g.slug}`} className="text-primary hover:underline">
                  {g.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/blog/export-google-timeline-data" className="text-primary hover:underline">
                Step by Step Guide to Export Your Google Timeline Data (iPhone screenshots)
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
