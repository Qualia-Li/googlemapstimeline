import { BlogPost, createBlogPost } from '../types/BlogPost';

// Example blog post data - this could come from a CMS, database, or other data source
export const blogPosts: BlogPost[] = [
  createBlogPost(
    "export-google-timeline-data",
    "export-google-timeline-data",
    {
      title: "Step by Step Guide to Export Your Google Timeline Data",
      description:
        "Learn how to export your location history from Google Maps Timeline and use it with visualization tools.",
      keywords: [
        "Google Maps",
        "Timeline",
        "Location History",
        "Export",
        "Data Visualization",
      ],
      publishDate: "Apr 2025",
      readingTime: "3 min read",
      openGraph: {
        title: "Step by Step Guide to Export Your Google Timeline Data",
        description:
          "Learn how to export your location history from Google Maps Timeline and use it with visualization tools.",
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
        description:
          "Learn how to export your location history from Google Maps Timeline and use it with visualization tools.",
        images: ["/images/export_google_timeline.webp"],
        creator: "@quanlai",
      },
      canonical:
        "https://www.googlemapstimeline.com/blog/export-google-timeline-data",
    },
    {
      introduction:
        "Google Maps Timeline is a powerful feature that records your location history. This guide will walk you through the current process of exporting this data from your mobile device so you can visualize it using our tool.",
      prerequisites: [
        "A Google account with Location History enabled",
        "Google Maps app on your smartphone",
        "About 5 minutes of your time",
      ],
      sections: [
        {
          title: "Open Google Maps and Access Your Profile",
          description:
            "Start by opening the Google Maps app and accessing your profile settings.",
          imageSrc: "/images/profile_pic.webp",
          imageAlt: "Google Maps app with profile icon highlighted",
          instructions: [
            "Open the Google Maps app on your phone",
            "Tap your profile picture or initial in the upper right corner",
          ],
        },
        {
          title: "Access Your Timeline",
          description: "Navigate to your timeline in the Google Maps app.",
          imageSrc: "/images/your_timeline.webp",
          imageAlt: "Profile menu with Timeline option highlighted",
          instructions: ['In the menu that appears, tap on "Your Timeline"'],
        },
        {
          title: "Access Settings",
          description: "Open the settings menu to find the export option.",
          imageSrc: "/images/location_privacy_settings.webp",
          imageAlt: "Timeline screen with three dots menu highlighted",
          instructions: [
            "Tap the three dots (⋮) in the upper right corner of your Timeline screen",
            'Tap "Location & Privacy Settings"',
          ],
        },
        {
          title: "Export Your Timeline Data",
          description: "Export your location history data from Google Maps.",
          imageSrc: "/images/export_timeline_data.webp",
          imageAlt: "Export Timeline Data option",
          instructions: [
            'Scroll down to find "Export Timeline Data"',
            "Tap on this option",
          ],
        },
        {
          title: "Share Your Data to Your Desktop",
          description:
            "Transfer the exported data to your computer for visualization.",
          imageSrc: "/images/share.webp",
          imageAlt: "Sharing options for Google Timeline data",
          instructions: [
            "Transfer the file to your desktop computer using one of these methods:",
            "AirDrop: If you have Apple devices, use AirDrop to quickly transfer the file",
            "Email: Attach the JSON file to an email and send it to yourself",
            "Google Drive: Upload to Google Drive from your phone, then download on your desktop",
          ],
        },
      ],
      troubleshooting: {
        title: "Troubleshooting Common Issues",
        items: [
          {
            title: "File is too large",
            description:
              "If you have years of location history, your file might be quite large. Our tool can handle files up to 100MB. If your file is larger:",
            solutions: [
              "Try exporting a shorter time frame",
              "If extracting on mobile is difficult, transfer the ZIP to a computer first",
            ],
          },
          {
            title: "No data showing up",
            description: "If you don't see any data after uploading your file:",
            solutions: [
              "Ensure you selected JSON format (not KML) when exporting",
              "Check that Location History was enabled in your Google account",
              "Try selecting a wider date range in our visualizer",
              "Make sure you're uploading the correct JSON file from the export",
            ],
          },
        ],
      },
      faq: [
        {
          question: "Is my data safe?",
          answer:
            "Yes! Our tool processes everything locally in your browser. Your location data never leaves your device or gets uploaded to any server.",
        },
        {
          question: "How often should I export my data?",
          answer:
            "This depends on how frequently you want to update your visualizations. For most users, exporting every few months is sufficient.",
        },
        {
          question: "What if I don't see any location history?",
          answer:
            "You may not have Location History enabled in your Google account. Visit your Google Account's Activity controls to enable it for future tracking.",
        },
        {
          question: "Can I export data for a specific time period only?",
          answer:
            "Yes, the export process allows you to select a specific date range for your export, which is helpful if you only want to visualize a particular trip or time period.",
        },
      ],
    }
  ),
  // New blog post
  createBlogPost(
    "privacy-and-location-data",
    "privacy-and-location-data",
    {
      title:
        "Understanding Privacy and Your Location Data in Google Maps (2025 Update)",
      description:
        "A comprehensive guide to Google Maps' privacy practices, recent changes, and how to protect your location data.",
      keywords: [
        "Privacy",
        "Location Data",
        "Google Maps",
        "Data Protection",
        "Timeline",
        "Local Storage",
      ],
      publishDate: "Apr 2025",
      readingTime: "8 min read",
      openGraph: {
        title:
          "Understanding Privacy and Your Location Data in Google Maps (2025 Update)",
        description:
          "A comprehensive guide to Google Maps' privacy practices, recent changes, and how to protect your location data.",
        type: "article",
        publishedTime: "2025-04-15T00:00:00Z",
        authors: ["Quan Lai"],
        images: [
          {
            url: "/images/privacy_location.webp",
            width: 800,
            height: 600,
            alt: "Privacy and Location Data Visualization",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title:
          "Understanding Privacy and Your Location Data in Google Maps (2025 Update)",
        description:
          "A comprehensive guide to Google Maps' privacy practices, recent changes, and how to protect your location data.",
        images: ["/images/privacy_location.webp"],
        creator: "@quanlai",
      },
      canonical:
        "https://www.googlemapstimeline.com/blog/privacy-and-location-data",
    },
    {
      introduction:
        "Recent changes to Google Maps' privacy policies have significantly impacted how your location data is handled. This comprehensive guide examines the current state of location data privacy in Google Maps, including the December 2024 shift to local storage, and provides detailed recommendations for protecting your digital footprint.",
      // keyPoints: [
      //   "Google Maps collects location data including current position, routes, and visited places for navigation and personalization",
      //   "Users can manage privacy through Timeline settings (formerly Location History), auto-delete options, and Incognito Mode",
      //   "Since December 2024, location history is stored locally on devices, enhancing privacy but with some reported data loss",
      //   "Controversy remains around Google Maps' data collection practices despite recent privacy improvements"
      // ],
      sections: [
        {
          title: "What Google Maps Collects and Uses",
          description:
            "Google Maps gathers several types of location data to provide its services:",
          instructions: [
            "Current location for real-time navigation",
            "Routes taken during trips for traffic predictions",
            "Places visited for personalized recommendations",
            "Search history and preferences for tailored results",
          ],
        },
        {
          title: "Privacy Controls for Users",
          description: "You have multiple options to manage your location data:",
          instructions: [
            "Timeline (formerly Location History) is now off by default",
            "Auto-delete options for 3, 18, or 36 months",
            "Incognito Mode for temporary privacy",
            "Detailed controls in Google Account settings",
          ],
        },
        {
          title: "Important 2024-2025 Changes",
          description:
            "Since December 2024, Google has implemented significant privacy changes:",
          instructions: [
            "Location history now stored locally on your device",
            "End-to-end encrypted cloud backups available",
            "Three-month auto-delete default for new users",
            "Warning: May 18, 2025 deadline for updating privacy settings",
          ],
        },
      ],
      troubleshooting: {
        title: "Privacy Management Tips",
        items: [
          {
            title: "Protecting Your Location Data",
            description: "Essential steps to enhance your privacy:",
            solutions: [
              "Regularly review Google Account settings at myaccount.google.com",
              "Back up Timeline data before May 18, 2025 using Google Takeout",
              "Limit location access to 'while using the app' in device settings",
              "Consider privacy-focused alternatives like Apple Maps or OpenStreetMap",
            ],
          },
          {
            title: "Understanding Data Access",
            description: "Who can access your location information:",
            solutions: [
              "Your Timeline data is now stored locally on your device",
              "Google can still access some location data through other services",
              "Law enforcement may request data with proper legal authority",
              "Third-party apps need explicit permission for location access",
            ],
          },
        ],
      },
      faq: [
        {
          question:
            "Is my location data truly private with the new local storage system?",
          answer:
            "While the December 2024 change to local storage significantly improves privacy by keeping Timeline data on your device, Google may still collect some location data through other services. The data is more secure from third-party access but requires proper device security.",
        },
        {
          question: "What happens to my data after May 18, 2025?",
          answer:
            "Users must update their privacy settings by May 18, 2025, to prevent potential data loss. Google has warned that Timeline data may be deleted if settings aren't updated. Use Google Takeout to backup your data before this deadline.",
        },
        {
          question:
            "Can I still use Google Maps features without sharing location data?",
          answer:
            "Yes, but with limitations. You can use basic navigation and search features without location sharing, but real-time navigation, personalized recommendations, and some advanced features may be restricted. Consider using Incognito Mode for temporary privacy.",
        },
        {
          question: "What are the most private alternatives to Google Maps?",
          answer:
            "Several alternatives offer stronger privacy protections: Apple Maps provides end-to-end encryption, OpenStreetMap collects minimal data, and OsmAnd operates without personal data collection. However, these may offer fewer features than Google Maps.",
        },
      ],
    }
  ),
];

// Helper function to get a blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Helper function to get all blog posts (could include pagination, filters, etc.)
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
} 