import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, Clock, ArrowLeft, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Step by Step Guide to Export Your Google Timeline Data",
  description: "Learn how to export your location history from Google Maps Timeline and use it with visualization tools.",
  openGraph: {
    title: "Step by Step Guide to Export Your Google Timeline Data",
    description: "Learn how to export your location history from Google Maps Timeline and use it with visualization tools.",
    type: "article",
    publishedTime: "2025-04-12T00:00:00Z",
    authors: ["Quan Lai"],
    images: [
      {
        url: "/images/export_google_timeline.webp",
        width: 800,
        height: 800,
        alt: "Google Maps Timeline Export Process",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Step by Step Guide to Export Your Google Timeline Data",
    description: "Learn how to export your location history from Google Maps Timeline and use it with visualization tools.",
    images: ["/images/export_google_timeline.webp"],
    creator: "@quanlai",
  },
  canonical: "https://googlemapstimeline.com/blog/export-google-timeline-data",
};

export default function ExportGoogleTimelineDataPage() {
  return (
    <>
      <article className="container mx-auto p-4 md:p-6 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Map
          </Button>
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Step by Step Guide to Export Your Google Timeline Data in 2025</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4" />
              Updated: Apr 2025
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              3 min read
            </div>
          </div>

          <div className="rounded-lg overflow-hidden bg-muted mb-8 flex items-center justify-center">
            <Image 
              src="/images/export_google_timeline.webp" 
              alt="Google Maps Timeline Export Process"
              width={800}
              height={800}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground mb-8">
            Google Maps Timeline is a powerful feature that records your location history. This guide will walk you through the current process of exporting this data from your mobile device so you can visualize it using our tool.
          </p>

          <Alert className="my-6">
            <AlertTitle>Privacy First</AlertTitle>
            <AlertDescription>
              Your location data contains sensitive information. Our tool processes this data entirely in your browser - we never store or transmit your data to any server.
            </AlertDescription>
          </Alert>

          <h2 className="text-2xl font-bold mt-8 mb-4">Prerequisites</h2>
          <ul className="space-y-2 mb-6">
            <li>A Google account with Location History enabled</li>
            <li>Google Maps app on your smartphone</li>
            <li>About 5 minutes of your time</li>
          </ul>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-3">Step 1: Open Google Maps and Access Your Profile</h2>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/2">
                  <ol className="space-y-4 mb-4">
                    <li>Open the Google Maps app on your phone</li>
                    <li>Tap your profile picture or initial in the upper right corner</li>
                  </ol>
                </div>
                <div className="md:w-1/2 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <Image 
                    src="/images/profile_pic.webp" 
                    alt="Google Maps app with profile icon highlighted"
                    width={300}
                    height={500}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Step 2: Access Your Timeline</h2>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/2">
                  <ol className="space-y-4 mb-4">
                    <li>In the menu that appears, tap on "Your Timeline"</li>
                  </ol>
                </div>
                <div className="md:w-1/2 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <Image 
                    src="/images/your_timeline.webp" 
                    alt="Profile menu with Timeline option highlighted"
                    width={300}
                    height={500}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Step 3: Access Settings</h2>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/2">
                  <ol className="space-y-4 mb-4">
                    <li>Tap the three dots (⋮) in the upper right corner of your Timeline screen</li>
                    <li>Tap "Location & Privacy Settings"</li>
                  </ol>
                </div>
                <div className="md:w-1/2 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <Image 
                    src="/images/location_privacy_settings.webp" 
                    alt="Timeline screen with three dots menu highlighted"
                    width={300}
                    height={500}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Step 4: Export Your Timeline Data</h2>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/2">
                  <ol className="space-y-4 mb-4">
                    <li>Scroll down to find "Export Timeline Data"</li>
                    <li>Tap on this option</li>
                  </ol>
                </div>
                <div className="md:w-1/2 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <Image 
                    src="/images/export_timeline_data.webp" 
                    alt="Export Timeline Data option"
                    width={300}
                    height={500}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-3">Step 5: Share Your Data to Your Desktop</h2>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/2">
                  <p className="mb-4">
                    After requesting the export and receiving the notification:
                  </p>
                  <ol className="space-y-4 mb-4">
                    <li>Transfer the file to your desktop computer using one of these methods:
                      <ul className="ml-6 mt-2 space-y-2">
                        <li><strong>AirDrop:</strong> If you have Apple devices, use AirDrop to quickly transfer the file</li>
                        <li><strong>Email:</strong> Attach the JSON file to an email and send it to yourself</li>
                        <li><strong>Google Drive:</strong> Upload to Google Drive from your phone, then download on your desktop</li>
                      </ul>
                    </li>
                  </ol>
                </div>
                <div className="md:w-1/2 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <Image 
                    src="/images/share.webp" 
                    alt="Sharing options for Google Timeline data"
                    width={300}
                    height={500}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="my-8">
            <Separator />
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Troubleshooting Common Issues</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">File is too large</h3>
          <p className="mb-4">
            If you have years of location history, your file might be quite large. Our tool can handle files up to 100MB. If your file is larger:
          </p>
          <ul className="space-y-2 mb-6">
            <li>Try exporting a shorter time frame</li>
            <li>If extracting on mobile is difficult, transfer the ZIP to a computer first</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">No data showing up</h3>
          <p className="mb-4">
            If you don't see any data after uploading your file:
          </p>
          <ul className="space-y-2 mb-6">
            <li>Ensure you selected JSON format (not KML) when exporting</li>
            <li>Check that Location History was enabled in your Google account</li>
            <li>Try selecting a wider date range in our visualizer</li>
            <li>Make sure you're uploading the correct JSON file from the export</li>
          </ul>

          <div className="my-8">
            <Separator />
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">FAQ</h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Is my data safe?</h3>
                <p>Yes! Our tool processes everything locally in your browser. Your location data never leaves your device or gets uploaded to any server.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">How often should I export my data?</h3>
                <p>This depends on how frequently you want to update your visualizations. For most users, exporting every few months is sufficient.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">What if I don't see any location history?</h3>
                <p>You may not have Location History enabled in your Google account. Visit your Google Account's Activity controls to enable it for future tracking.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Can I export data for a specific time period only?</h3>
                <p>Yes, the export process allows you to select a specific date range for your export, which is helpful if you only want to visualize a particular trip or time period.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
} 