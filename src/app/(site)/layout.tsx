import type { Metadata } from "next";
import Adsterra from "@/components/Adsterra";
import Analytics from "@/components/Analytics";
import { geistSans, geistMono } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.googlemapstimeline.com'),
  title: "Google Maps Timeline Visualizer",
  description: "Visualize your Google Maps Timeline data with this free, privacy-focused tool. Upload your location history and explore your travels.",
  keywords: ["google maps", "location history", "timeline", "maps", "visualization"],
  alternates: {
    canonical: 'https://www.googlemapstimeline.com',
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "Google Maps Timeline Visualizer",
    description: "Visualize your Google Maps Timeline data with this free, privacy-focused tool. Upload your location history and explore your travels.",
    url: 'https://www.googlemapstimeline.com',
    siteName: 'Google Maps Timeline Visualizer',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/ogimage.jpg',
        width: 1200,
        height: 630,
        alt: 'Google Maps Timeline Visualizer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Google Maps Timeline Visualizer",
    description: "Visualize your Google Maps Timeline data with this free, privacy-focused tool. Upload your location history and explore your travels.",
    images: ['/ogimage.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Adsterra />
        {children}
      </body>
    </html>
  );
}
