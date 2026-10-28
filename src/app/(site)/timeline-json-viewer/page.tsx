import Link from "next/link";
import { GuideLayout, guideMetadata, type GuideMeta } from "@/components/GuideLayout";

const meta: GuideMeta = {
  slug: "timeline-json-viewer",
  title: "Timeline.json Viewer: Open Your Google Timeline JSON File",
  description:
    "Open Google Timeline JSON files (Android Timeline.json and iPhone location-history.json) in a free online viewer, and learn what each field in the file means.",
  datePublished: "2026-10-28",
};

export const metadata = guideMetadata(meta);

const faq = [
  {
    q: "How do I open Timeline.json?",
    a: "Drop it onto the upload box of the Google Maps Timeline Visualizer. It reads the file in your browser and draws your visits and routes on a map. A text editor also opens it, but a multi-year file is many megabytes of nested JSON.",
  },
  {
    q: "Can Google Maps import my Timeline.json back?",
    a: "Not from the JSON file. Google Maps restores Timeline only from its own encrypted backup. The JSON export is for keeping a copy and for viewing in tools like this one.",
  },
  {
    q: "Which Google Timeline JSON files does this viewer support?",
    a: "Android Timeline.json (the semanticSegments format) and the iPhone location-history.json export. Older Google Takeout files such as Records.json and the Semantic Location History folders are not supported yet.",
  },
  {
    q: "Is it safe to open my timeline JSON online?",
    a: "With this viewer, yes: there is no backend server, so the file is parsed by your browser and never uploaded. The source code is public on GitHub if you want to check.",
  },
];

export default function Page() {
  return (
    <GuideLayout meta={meta} faq={faq}>
      <p>
        When you export Google Maps Timeline, you get a JSON file: <code>Timeline.json</code> on Android or{" "}
        <code>location-history.json</code> on iPhone. It is plain text, but it is not readable as-is. This page shows
        how to open it as a map, and what the fields inside mean.
      </p>

      <h2>Open your timeline JSON file in three steps</h2>
      <ol>
        <li>
          Export it from your phone if you have not yet (see{" "}
          <Link href="/export-google-maps-timeline">how to export Google Maps Timeline</Link>).
        </li>
        <li>Go to the <Link href="/">Timeline Visualizer</Link> and drag the JSON file onto the upload box, or click <em>Select File</em>.</li>
        <li>Pick a date range. Visits appear as pins, trips as lines, with totals for places and distance.</li>
      </ol>

      <h2>Android Timeline.json format</h2>
      <p>The Android export is one JSON object with three top-level keys:</p>
      <ul>
        <li><code>semanticSegments</code>: the timeline itself, one entry per visit, trip or path.</li>
        <li><code>rawSignals</code>: raw position, Wi-Fi and activity readings recorded by the phone.</li>
        <li><code>userLocationProfile</code>: places Google inferred as frequent, such as home and work.</li>
      </ul>
      <p>A visit segment looks like this (values shortened):</p>
      <pre>{`{
  "startTime": "2025-05-03T10:21:04.999+09:00",
  "endTime": "2025-05-03T16:54:09.429+09:00",
  "visit": {
    "probability": 0.72,
    "topCandidate": {
      "placeId": "ChIJ...",
      "semanticType": "UNKNOWN",
      "placeLocation": { "latLng": "35.6586°, 139.7454°" }
    }
  }
}`}</pre>
      <p>
        A trip segment has <code>activity</code> instead, with <code>start</code> and <code>end</code> coordinates,{" "}
        <code>distanceMeters</code> and a <code>topCandidate.type</code> such as <code>IN_PASSENGER_VEHICLE</code> or{" "}
        <code>WALKING</code>. Coordinates are written as <code>&quot;lat°, lng°&quot;</code> strings.
      </p>

      <h2>iPhone location-history.json format</h2>
      <p>
        The iPhone export is a list rather than an object. Each entry has <code>startTime</code> and{" "}
        <code>endTime</code> plus one of <code>visit</code>, <code>activity</code> or <code>timelinePath</code>.
        Coordinates use the form <code>&quot;geo:37.375163,-122.046013&quot;</code>, and numbers such as probability
        and distance are stored as strings.
      </p>

      <h2>Timeline JSON viewer options compared</h2>
      <table>
        <thead>
          <tr><th>Option</th><th>Shows a map</th><th>File leaves your device</th></tr>
        </thead>
        <tbody>
          <tr><td>Text editor or browser JSON view</td><td>No</td><td>No</td></tr>
          <tr><td>Google Maps app</td><td>Yes, but it cannot open the exported JSON</td><td>Not applicable</td></tr>
          <tr><td><Link href="/">Google Maps Timeline Visualizer</Link></td><td>Yes</td><td>No, parsed in the browser</td></tr>
        </tbody>
      </table>

      <h2>If the viewer says the file is not a timeline</h2>
      <ul>
        <li>Make sure you picked the <code>.json</code> file itself, not a ZIP that contains it.</li>
        <li>Files named <code>Records.json</code> or folders called <em>Semantic Location History</em> come from the old Google Takeout export, which this viewer does not read yet.</li>
        <li>If the file opened but the map is empty, widen the date range: it starts on the last 7 days.</li>
      </ul>
    </GuideLayout>
  );
}
