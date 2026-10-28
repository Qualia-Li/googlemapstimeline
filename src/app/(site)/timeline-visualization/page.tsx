import Link from "next/link";
import { GuideLayout, guideMetadata, type GuideMeta } from "@/components/GuideLayout";

const meta: GuideMeta = {
  slug: "timeline-visualization",
  title: "Timeline Visualization of Your Google Location History",
  description:
    "Visualize your Google location history as a map timeline: places visited, routes travelled and distance, for any date range. Free and private, in your browser.",
  datePublished: "2026-10-28",
};

export const metadata = guideMetadata(meta);

const faq = [
  {
    q: "What is a location history timeline visualization?",
    a: "A map that shows where you were over a period of time: pins for the places you stopped and lines for the trips between them, filtered by date.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. The visualizer is a web page. Nothing is downloaded or installed, and it works in any modern browser.",
  },
  {
    q: "Can it make a video of my timeline?",
    a: "No. It shows an interactive map and statistics. You can take screenshots or a screen recording of the map yourself.",
  },
  {
    q: "Which data does it need?",
    a: "Your Google Maps Timeline export: Timeline.json from Android or location-history.json from iPhone.",
  },
];

export default function Page() {
  return (
    <GuideLayout meta={meta} faq={faq}>
      <p>
        Your Google Maps Timeline holds every stop and trip your phone recorded. As a list, it is hard to read. As a
        timeline visualization on a map, patterns show up quickly: where you spend your weekends, how far you commute,
        the exact route of a road trip.
      </p>

      <h2>What the visualization shows</h2>
      <ul>
        <li><strong>Places visited:</strong> each stop is a pin, coloured by type, such as home, work or unknown.</li>
        <li><strong>Routes:</strong> trips between stops are drawn as lines in order.</li>
        <li><strong>Distance travelled:</strong> total for the selected range, in kilometres or miles.</li>
        <li><strong>Date filter:</strong> today, last week, last month, this year, or any custom range.</li>
      </ul>

      <h2>How to visualize your Google timeline</h2>
      <ol>
        <li>
          Export the data from your phone. <Link href="/export-google-maps-timeline">Step-by-step export guide</Link>.
        </li>
        <li>Open the <Link href="/">timeline visualizer</Link> and drop in the JSON file.</li>
        <li>Choose a date range and explore the map. Click a pin to see the place type and coordinates.</li>
      </ol>

      <h2>Ideas for using your timeline visualization</h2>
      <ul>
        <li><strong>Travel recap:</strong> select the dates of a trip to see the full route on one map.</li>
        <li><strong>Year in review:</strong> pick <em>This Year</em> to see every place you went.</li>
        <li><strong>Mileage:</strong> check how far you travelled in a month, for your own records.</li>
        <li><strong>Memory lane:</strong> load an older export and look back at a past city or job.</li>
      </ul>

      <h2>Privacy</h2>
      <p>
        Location history is sensitive. This visualizer has no backend: the JSON file is read by your browser, and
        nothing is uploaded or stored. You can read the code on{" "}
        <a href="https://github.com/Qualia-Li/googlemapstimeline" target="_blank" rel="noopener">GitHub</a> or host it
        yourself.
      </p>

      <p>
        If you are not sure what your export contains, the{" "}
        <Link href="/timeline-json-viewer">Timeline.json viewer guide</Link> walks through the file format.
      </p>
    </GuideLayout>
  );
}
