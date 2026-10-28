import Link from "next/link";
import { GuideLayout, guideMetadata, type GuideMeta } from "@/components/GuideLayout";

const meta: GuideMeta = {
  slug: "export-google-maps-timeline",
  title: "How to Export Google Maps Timeline Data (Android and iPhone)",
  description:
    "Export your Google Maps Timeline as a JSON file on Android (Timeline.json) or iPhone (location-history.json), move it to your computer, and view it on a map.",
  datePublished: "2026-10-28",
};

export const metadata = guideMetadata(meta);

const faq = [
  {
    q: "Can I still export Google Maps Timeline from Google Takeout?",
    a: "For accounts whose Timeline has moved onto the phone, Takeout no longer holds your visits and routes. The export now happens on the phone itself, using the steps on this page.",
  },
  {
    q: "Can I export my Google Maps Timeline on a computer?",
    a: "No. Timeline is stored on your phone, so the export starts there. Once the JSON file is saved, send it to your computer by email, AirDrop, Google Drive or a USB cable.",
  },
  {
    q: "What format is the exported file?",
    a: "JSON. Android saves a file called Timeline.json. The iPhone Google Maps app saves location-history.json. The visualizer on this site reads both.",
  },
  {
    q: "I only see a few months of history. Why?",
    a: "The export contains what is on that phone. Check the Timeline auto-delete setting, and if you restored from an encrypted Timeline backup, make sure the restore finished before exporting.",
  },
];

export default function Page() {
  return (
    <GuideLayout meta={meta} faq={faq}>
      <p>
        Google Maps Timeline used to live in your Google account, and you exported it from Google Takeout. Google has
        since moved Timeline onto each phone, so the export now starts on the phone. This guide covers both phone
        types, what file you get, and how to open it.
      </p>

      <h2>Export Google Maps Timeline on Android</h2>
      <ol>
        <li>Open your phone&apos;s <strong>Settings</strong> app (the system settings, not Google Maps).</li>
        <li>Tap <strong>Location</strong>, then <strong>Location services</strong>.</li>
        <li>Tap <strong>Timeline</strong>.</li>
        <li>Tap <strong>Export Timeline data</strong> and choose where to save the file.</li>
      </ol>
      <p>
        You get a single file named <code>Timeline.json</code>. On some phones the menu names differ slightly (for
        example <em>Google</em> &gt; <em>Location</em> on older Android versions), but the last two steps are the same.
      </p>

      <h2>Export Google Maps Timeline on iPhone</h2>
      <ol>
        <li>Open the <strong>Google Maps</strong> app and tap your profile picture in the top right.</li>
        <li>Tap <strong>Your Timeline</strong>.</li>
        <li>Tap the three dots (⋯) in the top right, then <strong>Location &amp; privacy settings</strong>.</li>
        <li>Scroll down and tap <strong>Export Timeline data</strong>.</li>
        <li>Pick a destination from the share sheet: AirDrop to a Mac, Mail, or Save to Files.</li>
      </ol>
      <p>
        The iPhone export is named <code>location-history.json</code>. Our{" "}
        <Link href="/blog/export-google-timeline-data">screenshot walkthrough</Link> shows each of these screens.
      </p>

      <h2>Move the file to your computer</h2>
      <ul>
        <li><strong>Email:</strong> attach the JSON file and send it to yourself. Works for files up to your mail provider&apos;s attachment limit.</li>
        <li><strong>AirDrop:</strong> fastest from iPhone to Mac.</li>
        <li><strong>Google Drive:</strong> upload from the phone, download on the computer. Best for large multi-year files.</li>
        <li><strong>USB cable:</strong> on Android, copy the file from the folder you saved it to.</li>
      </ul>

      <h2>What is in the export</h2>
      <table>
        <thead>
          <tr><th>Phone</th><th>File name</th><th>Top-level shape</th></tr>
        </thead>
        <tbody>
          <tr><td>Android</td><td><code>Timeline.json</code></td><td>An object with <code>semanticSegments</code>, <code>rawSignals</code> and <code>userLocationProfile</code></td></tr>
          <tr><td>iPhone</td><td><code>location-history.json</code></td><td>A list of entries, each a <code>visit</code>, an <code>activity</code> or a <code>timelinePath</code></td></tr>
        </tbody>
      </table>
      <p>
        Both contain the places you stopped at, the trips between them, and timestamps. The{" "}
        <Link href="/timeline-json-viewer">Timeline.json viewer guide</Link> explains each field.
      </p>

      <h2>View the exported timeline on a map</h2>
      <p>
        Open the <Link href="/">Google Maps Timeline Visualizer</Link>, drop the JSON file onto the upload box, and pick
        a date range. You see every visit as a pin, the routes between them, and the total distance for that period. The
        file is read by your browser and never sent to a server.
      </p>
    </GuideLayout>
  );
}
