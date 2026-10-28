import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { parseISO, isWithinInterval } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface LocationHistoryItem {
  startTime: string;
  endTime: string;
  visit?: {
    topCandidate: {
      placeLocation: string;
      placeID?: string;
      semanticType?: string;
    };
    probability: string;
  };
  activity?: {
    start: string;
    end: string;
    topCandidate: {
      type: string;
      probability: string;
    };
    distanceMeters: string;
  };
}

export function parseGoogleLocation(location: string): { lat: number; lng: number } | null {
  if (!location) return null;
  
  // Format is typically "geo:37.375163,-122.046013"
  const matches = location.match(/geo:(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (!matches || matches.length !== 3) return null;
  
  return {
    lat: parseFloat(matches[1]),
    lng: parseFloat(matches[2])
  };
}

export function filterLocationsByDateRange(
  locations: LocationHistoryItem[],
  startDate: Date,
  endDate: Date
): LocationHistoryItem[] {
  return locations.filter(item => {
    const itemStartTime = parseISO(item.startTime);
    return isWithinInterval(itemStartTime, { start: startDate, end: endDate });
  });
}

export function extractPathFromActivityData(activities: LocationHistoryItem[]): Array<{ lat: number; lng: number }> {
  const path: Array<{ lat: number; lng: number }> = [];
  
  activities.forEach(activity => {
    if (activity.activity) {
      const start = parseGoogleLocation(activity.activity.start);
      const end = parseGoogleLocation(activity.activity.end);
      
      if (start) path.push(start);
      if (end) path.push(end);
    }
  });
  
  return path;
}

export function extractMarkersFromVisitData(visits: LocationHistoryItem[]): Array<{ 
  lat: number; 
  lng: number; 
  title: string; 
  startTime: string;
  endTime: string;
  type?: string;
}> {
  return visits
    .filter(item => item.visit)
    .map(item => {
      const location = parseGoogleLocation(item.visit?.topCandidate.placeLocation || "");
      if (!location) return null;
      
      return {
        lat: location.lat,
        lng: location.lng,
        title: item.visit?.topCandidate.semanticType || "Unknown location",
        startTime: item.startTime,
        endTime: item.endTime,
        type: item.visit?.topCandidate.semanticType
      };
    })
    .filter(Boolean) as Array<{ 
      lat: number; 
      lng: number; 
      title: string; 
      startTime: string;
      endTime: string;
      type?: string;
    }>;
}

/** "51.6659027°, 17.8121633°" (Android Timeline.json) -> "geo:51.6659027,17.8121633". */
function latLngToGeo(latLng: unknown): string {
  if (typeof latLng !== "string") return "";
  const parts = latLng.replace(/°/g, "").split(",").map((p) => parseFloat(p.trim()));
  if (parts.length !== 2 || !parts.every(Number.isFinite)) return "";
  return `geo:${parts[0].toFixed(7)},${parts[1].toFixed(7)}`;
}

/** HOME -> Home, INFERRED_WORK -> Work, UNKNOWN -> Unknown, so map colours match the iPhone export. */
function semanticTypeLabel(type: unknown): string {
  if (typeof type !== "string" || !type) return "Unknown";
  const t = type.replace(/^INFERRED_/, "").toLowerCase().replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * Turn any supported Timeline export into the iPhone array shape the visualizer reads.
 * - iPhone "location-history.json": already an array of { startTime, visit | activity }.
 * - Android "Timeline.json": { semanticSegments: [...] } with "lat°, lng°" strings.
 * Returns null when the file is neither.
 */
export function normalizeTimelineExport(json: unknown): LocationHistoryItem[] | null {
  if (Array.isArray(json)) {
    // iPhone exports mix visit/activity entries with timelinePath ones, so the first entry alone proves nothing.
    const looksLikeTimeline = json.some((x) => x?.startTime && (x.visit || x.activity || x.timelinePath));
    if (json.length > 0 && !looksLikeTimeline) return null;
    return json as LocationHistoryItem[];
  }
  const segments = (json as { semanticSegments?: unknown })?.semanticSegments;
  if (!Array.isArray(segments)) return null;

  const items: LocationHistoryItem[] = [];
  for (const seg of segments) {
    if (!seg?.startTime) continue;
    const base = { startTime: seg.startTime, endTime: seg.endTime ?? seg.startTime };
    if (seg.visit) {
      const top = seg.visit.topCandidate ?? {};
      const placeLocation = latLngToGeo(top.placeLocation?.latLng);
      if (!placeLocation) continue;
      items.push({
        ...base,
        visit: {
          topCandidate: {
            placeLocation,
            placeID: top.placeId,
            semanticType: semanticTypeLabel(top.semanticType),
          },
          probability: String(seg.visit.probability ?? ""),
        },
      });
    } else if (seg.activity) {
      const start = latLngToGeo(seg.activity.start?.latLng);
      const end = latLngToGeo(seg.activity.end?.latLng);
      if (!start || !end) continue;
      items.push({
        ...base,
        activity: {
          start,
          end,
          topCandidate: {
            type: String(seg.activity.topCandidate?.type ?? ""),
            probability: String(seg.activity.topCandidate?.probability ?? ""),
          },
          distanceMeters: String(seg.activity.distanceMeters ?? ""),
        },
      });
    }
  }
  return items;
}
