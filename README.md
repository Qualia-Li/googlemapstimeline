# Google Maps Timeline Visualizer

Available at [www.googlemapstimeline.com](https://www.googlemapstimeline.com). 

This application allows you to visualize your Google Maps Timeline (Location History) data on an interactive map. Upload your location history JSON file, select a date range, and explore your past movements and visited places.

## Features

- **File Upload**: Directly upload your Google Maps Timeline JSON file
- **Interactive Map**: View your location history on an interactive Google Map
- **Date Range Selection**: Filter your location history by specific date ranges
- **Markers & Paths**: See both visited locations and movement paths
- **Responsive Design**: Works on desktop and mobile devices

## How to Get Your Google Maps Timeline Data

1. Go to [Google Takeout](https://takeout.google.com)
2. Deselect all services, then select only "Location History"
3. Choose "JSON format" as the export format
4. Click "Next step" and choose your delivery method
5. Create export and download the archive
6. Extract the archive and find the JSON file containing your location history
7. Upload this file to the application

## Setup and Running

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Prerequisites

Maps are rendered with [Leaflet](https://leafletjs.com/) over OpenStreetMap tiles.
No API key, billing account, or Google Cloud project is required.

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Privacy

This application processes your location data entirely in your browser. Your data is never sent to any server and remains on your device.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Support This Project

If you find this tool useful, please consider [supporting the project](https://googlemapstimeline.com/donate). Your donations help maintain and improve the Google Maps Timeline Visualizer.
