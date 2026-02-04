import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define paths
const locationHistoryFile = join(__dirname, 'location-history.json');
const publicDir = join(__dirname, 'public');
const publicLocationHistoryFile = join(publicDir, 'location-history.json');

// Copy location-history.json to public directory for client-side access
try {
  // Create public directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('Created public directory');
  }
  
  // Check if source file exists
  if (fs.existsSync(locationHistoryFile)) {
    // Read the file content
    const data = fs.readFileSync(locationHistoryFile, 'utf8');
    
    // Parse and validate JSON
    try {
      const jsonData = JSON.parse(data);
      if (!Array.isArray(jsonData)) {
        throw new Error('Location history data is not an array');
      }
      
      // Write to destination
      fs.writeFileSync(publicLocationHistoryFile, data);
      console.log(`Location history file copied to public directory (${jsonData.length} locations)`);
    } catch (jsonError) {
      console.error('Invalid JSON in location-history.json:', jsonError);
    }
  } else {
    console.warn('location-history.json not found in root directory');
    
    // Check if we have it in public already, if not create an empty array
    if (!fs.existsSync(publicLocationHistoryFile)) {
      fs.writeFileSync(publicLocationHistoryFile, '[]');
      console.log('Created empty location history file in public directory');
    }
  }
} catch (error) {
  console.error('Error processing location history file:', error);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Config options here
  // Ensure large JSON files can be processed
  experimental: {
    largePageDataBytes: 512 * 1024, // 512KB, adjust as needed
  },
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