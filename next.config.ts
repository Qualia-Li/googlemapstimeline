import type { NextConfig } from "next";
import path from 'path';
import fs from 'fs';

// Copy location-history.json to public directory for client-side access
const locationHistoryFile = path.join(process.cwd(), 'location-history.json');
const publicLocationHistoryFile = path.join(process.cwd(), 'public', 'location-history.json');

try {
  // Create public directory if it doesn't exist
  if (!fs.existsSync(path.join(process.cwd(), 'public'))) {
    fs.mkdirSync(path.join(process.cwd(), 'public'));
  }
  
  // Copy the file if it exists
  if (fs.existsSync(locationHistoryFile)) {
    fs.copyFileSync(locationHistoryFile, publicLocationHistoryFile);
    console.log('Location history file copied to public directory');
  } else {
    console.warn('location-history.json not found in root directory');
  }
} catch (error) {
  console.error('Error copying location history file:', error);
}

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
