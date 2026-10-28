"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { subDays, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { ko, id, vi, ja } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { Loader2, AlertCircle } from "lucide-react";

import { DateRangePickerWithPresets } from "@/components/date-range-picker";
import MapView from "@/components/map-view";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
  LocationHistoryItem,
  filterLocationsByDateRange,
  extractMarkersFromVisitData,
  extractPathFromActivityData,
} from "@/lib/utils";
import { EN_UI, type Locale, type UiStrings } from "@/lib/i18n";

const DATE_LOCALES = { ko, id, vi, ja };

// Calculate distance between two coordinates using the Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  return distance;
};

interface TimelineVisualizerProps {
  t?: UiStrings;
  /** Omitted on the English page. */
  locale?: Locale;
  /** BCP 47 tag for the date-range stat, e.g. "ko-KR". */
  intl?: string;
}

/** Upload box, date filters, stats and map. Everything runs in the browser. */
export default function TimelineVisualizer({ t = EN_UI, locale, intl }: TimelineVisualizerProps) {
  // Calculate total distance for all path segments
  const calculateTotalDistance = (
    paths: Array<{ lat: number; lng: number }>
  ): number => {
    let totalDistance = 0;

    for (let i = 0; i < paths.length - 1; i++) {
      const current = paths[i];
      const next = paths[i + 1];
      totalDistance += calculateDistance(
        current.lat,
        current.lng,
        next.lat,
        next.lng
      );
    }

    // Convert to miles if needed
    return distanceUnit === "miles" ? totalDistance * 0.621371 : totalDistance;
  };

  const [distanceUnit, setDistanceUnit] = useState<"km" | "miles">("km");
  // Function to toggle distance unit
  const toggleDistanceUnit = useCallback(() => {
    setDistanceUnit((prevUnit) => (prevUnit === "km" ? "miles" : "km"));
  }, []);
  const [locationHistory, setLocationHistory] = useState<LocationHistoryItem[]>(
    []
  );
  const [filteredLocations, setFilteredLocations] = useState<
    LocationHistoryItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const [mapMarkers, setMapMarkers] = useState<
    ReturnType<typeof extractMarkersFromVisitData>
  >([]);
  const [mapPaths, setMapPaths] = useState<
    ReturnType<typeof extractPathFromActivityData>
  >([]);

  // Handle file upload success
  const handleFileLoaded = (data: LocationHistoryItem[]) => {
    // The default window is the last 7 days; most exports end earlier, which left the
    // map empty after every upload. Open on the 7 days ending at the file's last entry.
    const latest = data.reduce((max, item) => {
      const t = Date.parse(item.startTime);
      return Number.isFinite(t) && t > max ? t : max;
    }, -Infinity);
    if (Number.isFinite(latest) && latest < subDays(new Date(), 7).getTime()) {
      const to = new Date(latest);
      setDateRange({ from: subDays(to, 7), to });
    }
    setLocationHistory(data);
    setIsFileUploaded(true);
    setError(null);
  };

  // Handle file upload error
  const handleFileError = (errorMessage: string) => {
    setError(errorMessage);
    setIsFileUploaded(false);
  };

  // Filter and process location data when date range or location history changes
  useEffect(() => {
    if (locationHistory.length === 0 || !dateRange?.from) return;

    try {
      // Create a stable date string to prevent unnecessary recalculations
      const fromStr = dateRange.from.toISOString();
      const toStr = (dateRange.to || dateRange.from).toISOString();

      // Filter locations by selected date range
      const filtered = filterLocationsByDateRange(
        locationHistory,
        dateRange.from,
        dateRange.to || dateRange.from
      );

      setFilteredLocations(filtered);
      console.log("Filtered locations:", filtered.length, "items");

      // Extract markers from visit data
      const markers = extractMarkersFromVisitData(filtered);
      console.log("Extracted markers:", markers.length);
      setMapMarkers(markers);

      // Extract paths from activity data
      const paths = extractPathFromActivityData(filtered);
      console.log("Extracted paths:", paths.length, "points");
      setMapPaths(paths);
    } catch (err) {
      console.error("Error processing location data:", err);
      setError("Error processing location data");
    }
  }, [
    locationHistory,
    dateRange?.from?.toISOString(),
    dateRange?.to?.toISOString(),
  ]);

  // Handle date range change
  const handleDateRangeChange = useCallback((range: DateRange | undefined) => {
    setDateRange(range);
  }, []);

  // Update the map component render section to use a key based on the date range
  // to force proper re-rendering only when needed
  const mapKey = useMemo(() => {
    if (!dateRange?.from) return "no-date";
    const from = dateRange.from.toISOString().split("T")[0];
    const to = dateRange.to ? dateRange.to.toISOString().split("T")[0] : from;
    return `map-${from}-${to}-${filteredLocations.length}`;
  }, [dateRange?.from, dateRange?.to, filteredLocations.length]);

  if (isLoading) {
    return (
      <div className="py-16 flex items-center justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <p className="text-lg">{t.processing}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">{t.errorTitle}</h2>
          <p className="mb-4 text-red-500">{error}</p>
          <Button onClick={() => setError(null)} variant="outline">
            {t.tryAgain}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
        {!isFileUploaded ? (
          // Show file upload UI if no file has been uploaded yet
          <div className="my-8">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {t.uploadHeading}
            </h2>
            <FileUpload
              onFileLoaded={handleFileLoaded}
              onError={handleFileError}
              t={t}
            />

            {/* Show map based on user's country without asking for permission */}
            <div className="mb-6 mt-8 relative" style={{ height: "400px" }}>
              <MapView
                key="country-map"
                markers={[]}
                paths={[]}
                height="100%"
              />
            </div>
          </div>
        ) : (
          // Show map and date filters if a file has been uploaded
          <>
            <div className="mb-6 space-y-4">
              <div className="max-w-md">
                <DateRangePickerWithPresets
                  dateRange={dateRange}
                  onDateRangeChange={handleDateRangeChange}
                  t={t}
                  dateLocale={locale ? DATE_LOCALES[locale] : undefined}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setDateRange({
                      from: subDays(new Date(), 1),
                      to: new Date(),
                    });
                  }}
                >
                  {t.last24h}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDateRange({
                      from: subDays(new Date(), 7),
                      to: new Date(),
                    });
                  }}
                >
                  {t.lastWeek}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const lastMonth = subMonths(new Date(), 1);
                    setDateRange({
                      from: startOfMonth(lastMonth),
                      to: endOfMonth(lastMonth),
                    });
                  }}
                >
                  {t.lastMonth}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setIsFileUploaded(false)}
                  className="ml-auto"
                >
                  {t.uploadDifferent}
                </Button>
              </div>
            </div>

            <div className="stats mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stat p-4 bg-card rounded-lg shadow">
                <div className="stat-title text-muted-foreground">
                  {t.totalLocations}
                </div>
                <div className="stat-value text-2xl font-bold">
                  {mapMarkers.length}
                </div>
                <div className="stat-desc text-muted-foreground text-sm">
                  {t.placesVisited}
                </div>
              </div>
              <div className="stat p-4 bg-card rounded-lg shadow">
                <div className="stat-title text-muted-foreground">
                  {t.distance}
                </div>
                <div className="stat-value text-2xl font-bold flex items-center">
                  {calculateTotalDistance(mapPaths).toFixed(1)}
                  <button
                    onClick={toggleDistanceUnit}
                    className="ml-2 text-sm bg-secondary px-2 py-1 rounded hover:bg-secondary/80"
                  >
                    {distanceUnit}
                  </button>
                </div>
                <div className="stat-desc text-muted-foreground text-sm">
                  {t.journeyLength}
                </div>
              </div>
              <div className="stat p-4 bg-card rounded-lg shadow">
                <div className="stat-title text-muted-foreground">
                  {t.dateRange}
                </div>
                <div className="stat-value text-2xl font-bold">
                  {dateRange && intl
                    ? (() => {
                        const f = new Intl.DateTimeFormat(intl, { month: "short", day: "numeric" });
                        const from = dateRange.from ?? new Date();
                        return `${f.format(from)} - ${f.format(dateRange.to ?? from)}`;
                      })()
                    : dateRange
                    ? (() => {
                        const monthNames = [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ];
                        const fromMonth =
                          monthNames[dateRange.from?.getMonth() || 0];
                        const fromDate = dateRange.from?.getDate();
                        const toMonth = dateRange.to
                          ? monthNames[dateRange.to.getMonth()]
                          : fromMonth;
                        const toDate = dateRange.to?.getDate() || fromDate;
                        return `${fromMonth} ${fromDate} - ${toMonth} ${toDate}`;
                      })()
                    : t.none}
                </div>
                <div className="stat-desc text-muted-foreground text-sm">
                  {t.selectedPeriod}
                </div>
              </div>
              <div className="stat p-4 bg-card rounded-lg shadow">
                <div className="stat-title text-muted-foreground">
                  {t.dataPoints}
                </div>
                <div className="stat-value text-2xl font-bold">
                  {filteredLocations.length}
                </div>
                <div className="stat-desc text-muted-foreground text-sm">
                  {t.timelineEntries}
                </div>
              </div>
            </div>

            <div className="mb-6 relative" style={{ height: "600px" }}>
              {filteredLocations.length > 0 ? (
                <MapView
                  key={mapKey}
                  markers={mapMarkers}
                  paths={mapPaths}
                  height="100%"
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-secondary rounded-lg">
                  <p className="text-lg">
                    {t.noData}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
    </>
  );
}
