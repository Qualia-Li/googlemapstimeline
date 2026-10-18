import Script from "next/script";

/**
 * Adsterra, site-wide. Replaces AdSense, which never cleared site review here.
 *
 * NEXT_PUBLIC_ADSTERRA_SCRIPTS = comma-separated script URLs copied from the
 * Adsterra "Get code" snippets (Social Bar, Popunder). Unset = renders nothing.
 *
 * ponytail: script-only formats. Native/display banners need a container div
 * per placement; add them when a slot is wanted.
 */
export default function Adsterra() {
  const srcs = process.env.NEXT_PUBLIC_ADSTERRA_SCRIPTS?.split(",").map((s) => s.trim()).filter(Boolean);
  if (!srcs?.length) return null;

  return srcs.map((src) => <Script key={src} src={src} strategy="lazyOnload" />);
}
