import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate - Support Google Maps Timeline Visualizer",
  description: "Support the development of this free, privacy-focused Google Maps Timeline visualization tool. Your donation helps keep this project running and ad-free.",
  alternates: {
    canonical: 'https://www.googlemapstimeline.com/donate',
  },
  openGraph: {
    title: "Donate - Support Google Maps Timeline Visualizer",
    description: "Support the development of this free, privacy-focused Google Maps Timeline visualization tool. Your donation helps keep this project running and ad-free.",
    url: 'https://www.googlemapstimeline.com/donate',
    siteName: 'Google Maps Timeline Visualizer',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Donate - Support Google Maps Timeline Visualizer",
    description: "Support the development of this free, privacy-focused Google Maps Timeline visualization tool. Your donation helps keep this project running and ad-free.",
  },
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
