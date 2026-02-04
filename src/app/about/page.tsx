import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About - Google Maps Timeline Visualizer",
  description: "Google Maps Timeline Visualizer is a free, open-source tool built by Quan Lai to help you visualize your location history data.",
  alternates: {
    canonical: 'https://www.googlemapstimeline.com/about',
  },
  openGraph: {
    title: "About - Google Maps Timeline Visualizer",
    description: "Google Maps Timeline Visualizer is a free, open-source tool built by Quan Lai to help you visualize your location history data.",
    url: 'https://www.googlemapstimeline.com/about',
    siteName: 'Google Maps Timeline Visualizer',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/ogimage.jpg',
        width: 1200,
        height: 630,
        alt: 'About Google Maps Timeline Visualizer',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <main className="container mx-auto p-4 md:p-6 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Map
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-6">About</h1>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">What is Google Maps Timeline Visualizer?</h2>
            <p className="mb-4">
              Google Maps Timeline Visualizer is a free, open-source tool that lets you
              visualize your Google Maps location history on an interactive map. Upload your
              Timeline data export (JSON format) and instantly see your travels, visited
              places, and routes on a map with date filtering.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Who Built This?</h2>
            <p className="mb-4">
              This project was created by{" "}
              <a
                href="https://quanl.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Quan Lai
              </a>, a programmer and travel enthusiast based in San Francisco. It was born out of
              a personal need to visualize travel routes from Google Maps Timeline data in a
              simple, privacy-respecting way.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Privacy by Design</h2>
            <p className="mb-4">
              Your location data is deeply personal. That&apos;s why this tool processes
              everything entirely in your browser. No data is ever sent to any server, stored,
              or tracked. When you close the tab, your data is gone. You can verify this by
              reviewing the{" "}
              <a
                href="https://github.com/Qualia-Li/googlemapstimeline"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                open-source code on GitHub
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li>Export your Google Maps Timeline data from the Google Maps app on your phone</li>
              <li>Upload the JSON file to this tool</li>
              <li>Select a date range to filter your data</li>
              <li>Explore your travels on an interactive map with markers and routes</li>
            </ol>
            <p className="mb-4">
              For detailed instructions, check out our{" "}
              <Link href="/blog/export-google-timeline-data" className="text-blue-600 hover:underline">
                step-by-step export guide
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Open Source</h2>
            <p className="mb-4">
              This project is fully open source under the MIT license. Contributions, bug
              reports, and feature requests are welcome on{" "}
              <a
                href="https://github.com/Qualia-Li/googlemapstimeline"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="mb-4">
              Have questions, feedback, or suggestions? Reach out at{" "}
              <a href="mailto:mail@qualai.li" className="text-blue-600 hover:underline">
                mail@qualai.li
              </a>{" "}
              or open an issue on GitHub.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
