import Script from "next/script";

/**
 * AdSense Auto ads, site-wide.
 *
 * Renders nothing without NEXT_PUBLIC_ADSENSE_CLIENT, so the site is unchanged
 * until that var is set on the Vercel project.
 *
 * ponytail: Auto ads, no manual slots. Google picks placements. Switch to
 * explicit <ins> units only if a placement breaks the upload flow.
 */
export default function AdSense() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
