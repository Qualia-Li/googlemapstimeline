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
