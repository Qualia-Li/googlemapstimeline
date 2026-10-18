import Script from "next/script";

/**
 * Adsterra, site-wide. AdSense never cleared site review here, so AdSense is off
 * until it does.
 *
 * ponytail: hardcoded like every other owned site; the URLs are public anyway.
 */
const SCRIPTS = [
  "https://bauval.org/14/981b54bbbd84de59702304646ae0e7ae", // Social Bar
  "https://abscloud.org/1/60b71e77c3acc5fed02bf8cf503d05a0", // Popunder (added 2026-10-18)
];

export default function Adsterra() {
  return SCRIPTS.map((src) => <Script key={src} src={src} strategy="lazyOnload" />);
}
