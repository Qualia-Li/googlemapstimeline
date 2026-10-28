import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy - Google Maps Timeline Visualizer",
  description: "Privacy policy for Google Maps Timeline Visualizer. All data processing happens locally in your browser. We never store your location data.",
  alternates: {
    canonical: 'https://www.googlemapstimeline.com/privacy',
  },
  openGraph: {
    title: "Privacy Policy - Google Maps Timeline Visualizer",
    description: "Privacy policy for Google Maps Timeline Visualizer. All data processing happens locally in your browser. We never store your location data.",
    url: 'https://www.googlemapstimeline.com/privacy',
    siteName: 'Google Maps Timeline Visualizer',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/ogimage.png',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy - Google Maps Timeline Visualizer',
      },
    ],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <main className="container mx-auto p-4 md:p-6 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Map
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Commitment to Privacy</h2>
            <p className="mb-4">
              Google Maps Timeline Visualizer is designed with privacy as a core principle.
              We believe your location data is deeply personal, and we&apos;ve built this tool
              to ensure it stays completely under your control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Processing</h2>
            <p className="mb-4">
              <strong>All data processing happens locally in your browser.</strong> When you upload
              your Google Maps Timeline JSON file:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>The file is read and processed entirely on your device</li>
              <li>No location data is ever sent to our servers</li>
              <li>No location data is stored anywhere outside your browser session</li>
              <li>When you close the browser tab, your data is gone</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">What We Don&apos;t Collect</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Your location history or any GPS coordinates</li>
              <li>Your uploaded files or any part of their contents</li>
              <li>Personal information from your Google account</li>
              <li>Any identifiable information about your travels</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">What We Do Collect</h2>
            <p className="mb-4">
              We use Google Analytics to understand general usage patterns:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Page views and general traffic information</li>
              <li>Browser type and device information</li>
              <li>Approximate geographic region (country/city level, not precise location)</li>
            </ul>
            <p className="mb-4">
              This analytics data helps us improve the tool and is completely separate from
              any location data you upload for visualization.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <p className="mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Google Maps API:</strong> Used to display the map visualization. Google may collect usage data according to their privacy policy.</li>
              <li><strong>Google Analytics:</strong> Used for website analytics as described above.</li>
              <li><strong>PayPal:</strong> Used to process donations (only if you choose to donate).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Open Source</h2>
            <p className="mb-4">
              This project is open source. You can verify our privacy practices by reviewing
              the code at{" "}
              <a
                href="https://github.com/Qualia-Li/googlemapstimeline"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                github.com/Qualia-Li/googlemapstimeline
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy, you can reach us through
              the GitHub repository linked above.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
