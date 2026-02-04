import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact - Google Maps Timeline Visualizer",
  description: "Get in touch with the Google Maps Timeline Visualizer team. Reach out via email or GitHub for bug reports, feature requests, and general inquiries.",
  alternates: {
    canonical: 'https://www.googlemapstimeline.com/contact',
  },
  openGraph: {
    title: "Contact - Google Maps Timeline Visualizer",
    description: "Get in touch with the Google Maps Timeline Visualizer team. Reach out via email or GitHub for bug reports, feature requests, and general inquiries.",
    url: 'https://www.googlemapstimeline.com/contact',
    siteName: 'Google Maps Timeline Visualizer',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/ogimage.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Google Maps Timeline Visualizer',
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <main className="container mx-auto p-4 md:p-6 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Map
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Email</h2>
            <p className="mb-4">
              For general inquiries, feedback, or suggestions, reach out via email at{" "}
              <a href="mailto:mail@qualai.li" className="text-blue-600 hover:underline">
                mail@qualai.li
              </a>.
              We read every message and typically respond within a few business days.
              Whether you have a question about how to use the tool, want to suggest a new
              feature, or just want to say hello, we would love to hear from you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">GitHub</h2>
            <p className="mb-4">
              For bug reports and feature requests, please open an issue on our{" "}
              <a
                href="https://github.com/Qualia-Li/googlemapstimeline"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub repository
              </a>. Contributions and pull requests are also welcome. If you encounter a
              problem with file uploads, map rendering, or date filtering, GitHub issues
              are the best way to report it so we can track and resolve it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
            <p className="mb-4">
              Google Maps Timeline Visualizer is an open-source project maintained by{" "}
              <a
                href="https://quanl.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Quan Lai
              </a>, a software engineer based in San Francisco. The project is licensed
              under the MIT license and welcomes community involvement. It was created
              to provide a free, privacy-respecting way to explore Google Maps
              location history without sending any personal data to external servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Response Times</h2>
            <p className="mb-4">
              Since this is a community-driven open-source project, response times may
              vary. For urgent issues, GitHub is usually fastest. For general feedback
              or partnership inquiries, email works best. We appreciate your patience
              and support in keeping this tool free and available for everyone.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
