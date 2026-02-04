import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <meta charSet="utf-8" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2X617E3BDW"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2X617E3BDW');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
