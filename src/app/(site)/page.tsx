import type { Metadata } from "next";
import TimelineVisualizer from "@/components/TimelineVisualizer";
import { Footer } from "@/components/Footer";
import { SITE_URL, homeAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
    languages: homeAlternates(),
  },
};

const GUIDES = [
  {
    href: "/export-google-maps-timeline",
    title: "How to Export Google Maps Timeline Data (Android and iPhone)",
    desc: "Export Timeline.json from your phone now that Timeline is stored on your device.",
  },
  {
    href: "/timeline-json-viewer",
    title: "Timeline.json Viewer: Open Your Google Timeline JSON File",
    desc: "What is inside Timeline.json and location-history.json, and how to view it on a map.",
  },
  {
    href: "/google-maps-timeline",
    title: "Google Maps Timeline Viewer: See Your Google Timeline on a Map",
    desc: "Where Google Maps Timeline lives now, and how to see years of it on one map.",
  },
  {
    href: "/timeline-visualization",
    title: "Timeline Visualization for Your Google Location History",
    desc: "Turn your timeline into a map of places, routes and distance travelled.",
  },
];

export default function Home() {
  return (
    <>
      <main className="container mx-auto p-4 md:p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Google Maps Timeline Visualizer
        </h1>

        <TimelineVisualizer />

        {/* Blog / Guides Section */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Guides &amp; Resources
          </h2>
          <div className="grid gap-4">
            {GUIDES.map((g) => (
              <a
                key={g.href}
                href={g.href}
                className="bg-card p-4 rounded-lg shadow hover:shadow-md transition-shadow block"
              >
                <h3 className="text-lg font-semibold mb-1">{g.title}</h3>
                <p className="text-sm text-muted-foreground">{g.desc}</p>
              </a>
            ))}
            <a
              href="/blog/export-google-timeline-data"
              className="bg-card p-4 rounded-lg shadow hover:shadow-md transition-shadow block"
            >
              <h3 className="text-lg font-semibold mb-1">Step by Step Guide to Export Your Google Timeline Data</h3>
              <p className="text-sm text-muted-foreground">Learn how to download your location history from Google Maps and visualize it here.</p>
            </a>
            <a
              href="/blog/privacy-and-location-data"
              className="bg-card p-4 rounded-lg shadow hover:shadow-md transition-shadow block"
            >
              <h3 className="text-lg font-semibold mb-1">Understanding Privacy and Your Location Data</h3>
              <p className="text-sm text-muted-foreground">A guide to Google Maps privacy practices and how to protect your location data.</p>
            </a>
          </div>
          <p className="mt-4 text-center">
            <a href="/articles" className="text-primary hover:underline">More articles on Google Maps Timeline →</a>
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            🤔 Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-card p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">💰 Is this free?</h3>
              <p>
                Yes, it is completely free to use!
              </p>
            </div>

            <div className="bg-card p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">
                🔒 Is my data safe?
              </h3>
              <p>
                Absolutely! We don&apos;t store your data at all - we don&apos;t even have
                a backend server. All processing happens locally in your
                browser. Read our{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">privacy policy</a>
                {" "}for details.
              </p>
            </div>

            <div className="bg-card p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">
                🌐 Are you affiliated with Google?
              </h3>
              <p>
                No, I'm just a programmer who loves travel and needed a tool to
                visualize my travel routes. This is an independent project.
              </p>
            </div>

            <div className="bg-card p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">
                👨‍💻 What if I'm still uncertain about my data?
              </h3>
              <p>
                Our code is open source! You can feel free to check it (don't
                forget to give us a star) at{" "}
                <a
                  href="https://github.com/Qualia-Li/googlemapstimeline"
                  target="_blank"
                  rel="noopener"
                  className="text-blue-600 hover:underline"
                >
                  github.com/Qualia-Li/googlemapstimeline
                </a>
                . You can also host it yourself, no API key required.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
