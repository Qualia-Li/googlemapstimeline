"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { addDays, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Loader2, AlertCircle } from "lucide-react";
import Head from "next/head";

import { DateRangePickerWithPresets } from "@/components/date-range-picker";
import GoogleMap from "@/components/google-map";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { 
  LocationHistoryItem, 
  filterLocationsByDateRange, 
  extractMarkersFromVisitData,
  extractPathFromActivityData
} from "@/lib/utils";
import { DonationSection } from "@/components/DonationSection";
import { Footer } from "@/components/Footer";

// Get Google Maps API key from environment variable
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function Home() {
  const [locationHistory, setLocationHistory] = useState<LocationHistoryItem[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<LocationHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const [mapMarkers, setMapMarkers] = useState<ReturnType<typeof extractMarkersFromVisitData>>([]);
  const [mapPaths, setMapPaths] = useState<ReturnType<typeof extractPathFromActivityData>>([]);

  // Handle file upload success
  const handleFileLoaded = (data: LocationHistoryItem[]) => {
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
      console.log('Filtered locations:', filtered.length, 'items');

      // Extract markers from visit data
      const markers = extractMarkersFromVisitData(filtered);
      console.log('Extracted markers:', markers.length);
      setMapMarkers(markers);

      // Extract paths from activity data
      const paths = extractPathFromActivityData(filtered);
      console.log('Extracted paths:', paths.length, 'points');
      setMapPaths(paths);
    } catch (err) {
      console.error('Error processing location data:', err);
      setError('Error processing location data');
    }
  }, [locationHistory, dateRange?.from?.toISOString(), dateRange?.to?.toISOString()]);

  // Handle date range change
  const handleDateRangeChange = useCallback((range: DateRange | undefined) => {
    setDateRange(range);
  }, []);

  // Update the map component render section to use a key based on the date range
  // to force proper re-rendering only when needed
  const mapKey = useMemo(() => {
    if (!dateRange?.from) return 'no-date';
    const from = dateRange.from.toISOString().split('T')[0];
    const to = dateRange.to ? dateRange.to.toISOString().split('T')[0] : from;
    return `map-${from}-${to}-${filteredLocations.length}`;
  }, [dateRange?.from, dateRange?.to, filteredLocations.length]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <p className="text-lg">Loading your location history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Error Loading Data</h1>
          <p className="mb-4 text-red-500">{error}</p>
          <Button 
            onClick={() => setError(null)}
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Google Maps API Key Missing</h1>
          <p className="mb-4">Please add your Google Maps API key to the environment variables.</p>
          <p className="text-sm text-muted-foreground">
            Create a .env.local file and add: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Google Maps Timeline Visualizer</title>
        <meta
          name="description"
          content="Visualize your Google Maps Timeline data with this free tool. Upload your location history and see where you've been."
        />
        <link rel="canonical" href="https://googlemapstimeline.com" />
      </Head>
      <main className="container mx-auto p-4 md:p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Google Maps Timeline Visualizer
        </h1>

        {!isFileUploaded ? (
          // Show file upload UI if no file has been uploaded yet
          <div className="my-8">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Upload Your Location History
            </h2>
            <FileUpload
              onFileLoaded={handleFileLoaded}
              onError={handleFileError}
            />

            <DonationSection />

            {/* FAQ Section */}
            <div className="mt-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">
                🤔 Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">
                    💰 Is this free?
                  </h3>
                  <p>
                    Yes, it is completely free to use! But if you find it
                    helpful, you can donate to support development.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">
                    🔒 Is my data safe?
                  </h3>
                  <p>
                    Absolutely! We don't store your data at all - we don't even
                    have a backend server. All processing happens locally in
                    your browser.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">
                    🌐 Are you affiliated with Google?
                  </h3>
                  <p>
                    No, I'm just a programmer who loves travel and needed a tool
                    to visualize my travel routes. This is an independent
                    project.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">
                    👨‍💻 What if I'm still uncertain about my data?
                  </h3>
                  <p>
                    Our code is open source! You can feel free to check it
                    (don't forget to give us a star) at{" "}
                    <a
                      href="https://github.com/Qualia-Li/googlemapstimeline"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      github.com/Qualia-Li/googlemapstimeline
                    </a>
                    . You can also host it yourself if you have a Google API
                    key.
                  </p>
                </div>
              </div>
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
                  Last 24 Hours
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
                  Last Week
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDateRange({
                      from: subDays(new Date(), 30),
                      to: new Date(),
                    });
                  }}
                >
                  Last Month
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setIsFileUploaded(false)}
                  className="ml-auto"
                >
                  Upload Different File
                </Button>
              </div>
            </div>

            <div className="stats mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stat p-4 bg-card rounded-lg shadow">
                <div className="stat-title text-muted-foreground">
                  Total Locations
                </div>
                <div className="stat-value text-2xl font-bold">
                  {mapMarkers.length}
                </div>
                <div className="stat-desc text-muted-foreground text-sm">
                  Places visited
                </div>
              </div>
              <div className="stat p-4 bg-card rounded-lg shadow">
                <div className="stat-title text-muted-foreground">
                  Path Points
                </div>
                <div className="stat-value text-2xl font-bold">
                  {mapPaths.length}
                </div>
                <div className="stat-desc text-muted-foreground text-sm">
                  Travel coordinates
                </div>
              </div>
              <div className="stat p-4 bg-card rounded-lg shadow">
                <div className="stat-title text-muted-foreground">
                  Date Range
                </div>
                <div className="stat-value text-2xl font-bold">
                  {dateRange
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
                    : "None"}
                </div>
                <div className="stat-desc text-muted-foreground text-sm">
                  Selected period
                </div>
              </div>
              <div className="stat p-4 bg-card rounded-lg shadow">
                <div className="stat-title text-muted-foreground">
                  Data Points
                </div>
                <div className="stat-value text-2xl font-bold">
                  {filteredLocations.length}
                </div>
                <div className="stat-desc text-muted-foreground text-sm">
                  Timeline entries
                </div>
              </div>
            </div>

            <div className="mb-6 relative" style={{ height: "600px" }}>
              {filteredLocations.length > 0 ? (
                <GoogleMap
                  key={mapKey}
                  apiKey={GOOGLE_MAPS_API_KEY}
                  markers={mapMarkers}
                  paths={mapPaths}
                  height="100%"
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-secondary rounded-lg">
                  <p className="text-lg">
                    No location data available for the selected date range
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
