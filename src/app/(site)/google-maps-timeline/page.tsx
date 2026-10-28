import Link from "next/link";
import { GuideLayout, guideMetadata, type GuideMeta } from "@/components/GuideLayout";

const meta: GuideMeta = {
  slug: "google-maps-timeline",
  title: "Google Maps Timeline Viewer: See Your Google Timeline on a Map",
  description:
    "Where Google Maps Timeline is now, how to open it on Android and iPhone, and how to see months or years of your Google timeline on one map with a free viewer.",
  datePublished: "2026-10-28",
};

export const metadata = guideMetadata(meta);

const faq = [
  {
    q: "Can I see Google Maps Timeline on my computer?",
    a: "Not on the Google Maps website any more, since Timeline is stored on your phone. Export it from the phone and open the JSON file in a viewer such as the Timeline Visualizer to see it on a computer screen.",
  },
  {
    q: "Where is Timeline in Google Maps?",
    a: "In the Google Maps app, tap your profile picture and then Your Timeline. If you do not see it, Timeline may be turned off for your account in the Location settings.",
  },
  {
    q: "Can I see my whole Google timeline at once?",
    a: "The Google Maps app shows one day or one trip at a time. The Timeline Visualizer shows any date range you pick, such as a month, a year, or everything, on a single map.",
  },
  {
    q: "Does Google still keep my timeline?",
    a: "Timeline data is kept on your device, with an optional encrypted backup. You control it through the Timeline settings, including auto-delete.",
  },
];

export default function Page() {
  return (
    <GuideLayout meta={meta} faq={faq}>
      <p>
        Google Maps Timeline is the record of places you visited and routes you travelled, built from your phone&apos;s
        location history. It used to be viewable on the Google Maps website. Google has moved it onto the phone, which
        changes how you open it and how you can see it on a bigger screen.
      </p>

      <h2>How to open Google Maps Timeline on your phone</h2>
      <h3>Android and iPhone</h3>
      <ol>
        <li>Open the Google Maps app.</li>
        <li>Tap your profile picture in the top right.</li>
        <li>Tap <strong>Your Timeline</strong>.</li>
      </ol>
      <p>
        The app shows one day at a time, with a list of stops and the route between them. You can also browse by trip,
        place, or city.
      </p>

      <h2>What changed with Google Timeline</h2>
      <ul>
        <li><strong>Storage:</strong> timeline data is kept on the phone instead of in your Google account.</li>
        <li><strong>Web:</strong> Timeline is no longer available on the Google Maps website.</li>
        <li><strong>Backup:</strong> you can turn on an encrypted backup so a new phone can restore it.</li>
        <li><strong>Export:</strong> the JSON export moved from Google Takeout into the phone&apos;s Timeline settings.</li>
      </ul>

      <h2>See your Google Maps timeline on a map, any date range</h2>
      <p>
        The app is good for checking a single day. To look at a whole holiday, a year of commuting, or every city you have
        been to, a viewer that loads the full export works better:
      </p>
      <ol>
        <li>
          <Link href="/export-google-maps-timeline">Export your Google Maps Timeline</Link> from your phone as a JSON file.
        </li>
        <li>Open the <Link href="/">Google Maps Timeline Visualizer</Link> on your computer.</li>
        <li>Drop the file in and choose a date range, from one day to several years.</li>
      </ol>
      <p>You get a map with every visit, the routes between them, and totals for places visited and distance travelled.</p>

      <h2>Google Maps app vs Timeline Visualizer</h2>
      <table>
        <thead>
          <tr><th></th><th>Google Maps app</th><th>Timeline Visualizer</th></tr>
        </thead>
        <tbody>
          <tr><td>Device</td><td>Phone</td><td>Any browser, best on a computer</td></tr>
          <tr><td>Range on one screen</td><td>One day or one trip</td><td>Any date range</td></tr>
          <tr><td>Distance totals</td><td>Per day</td><td>For the whole range</td></tr>
          <tr><td>Edit or delete entries</td><td>Yes</td><td>No, view only</td></tr>
          <tr><td>Cost</td><td>Free</td><td>Free</td></tr>
        </tbody>
      </table>
      <p>
        The visualizer is independent and not affiliated with Google. It reads your file in the browser and never
        uploads it.
      </p>
    </GuideLayout>
  );
}
