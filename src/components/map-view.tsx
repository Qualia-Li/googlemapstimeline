"use client";

import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  markers?: Array<{
    lat: number;
    lng: number;
    title: string;
    type?: string;
  }>;
  paths?: Array<{
    lat: number;
    lng: number;
  }>;
  height?: string;
  mapOptions?: {
    center?: { lat: number; lng: number };
    zoom?: number;
  };
}

// Marker colours by place type, carried over from the previous Google pin set.
const TYPE_COLORS: Record<string, string> = {
  "Home": "#2563eb",
  "Work": "#dc2626",
  "School": "#ca8a04",
  "Restaurant": "#ea580c",
  "Shopping": "#9333ea",
  "Doctor's Office": "#16a34a",
  "Entertainment": "#db2777",
  "Unknown": "#38bdf8",
  "Default": "#6b7280",
};

function colorFor(type?: string): string {
  return (type && TYPE_COLORS[type]) || TYPE_COLORS["Default"];
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default function MapView({
  markers = [],
  paths = [],
  height = "600px",
  mapOptions = {},
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Create the map once.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const L = (await import('leaflet')).default;
        if (cancelled || !containerRef.current || mapRef.current) return;

        const center = mapOptions.center ?? { lat: 37.7749, lng: -122.4194 };
        const map = L.map(containerRef.current).setView(
          [center.lat, center.lng],
          mapOptions.zoom ?? 10
        );

        // ponytail: public OSM tiles, fine at this traffic. If loads grow past
        // OSM's fair-use policy, point this URL at a hosted basemap or self-host.
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        mapRef.current = map;
        layerRef.current = L.layerGroup().addTo(map);
      } catch (err) {
        console.error("Error initializing map:", err);
        if (!cancelled) setError("Failed to initialize map");
      }
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        layerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redraw markers and the path whenever either changes.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !mapRef.current || !layerRef.current) return;

      const map = mapRef.current;
      layerRef.current.clearLayers();

      markers.forEach(m => {
        L.circleMarker([m.lat, m.lng], {
          radius: 8,
          color: "#ffffff",
          weight: 2,
          fillColor: colorFor(m.type),
          fillOpacity: 1,
        })
          .bindPopup(
            `<div class="p-2">
              <h3 class="font-semibold">${escapeHtml(m.title)}</h3>
              <p>Lat: ${m.lat.toFixed(6)}, Lng: ${m.lng.toFixed(6)}</p>
            </div>`
          )
          .addTo(layerRef.current);
      });

      if (paths.length >= 2) {
        L.polyline(
          paths.map(p => [p.lat, p.lng] as [number, number]),
          { color: "#FF0000", opacity: 0.8, weight: 3 }
        ).addTo(layerRef.current);
      }

      if (markers.length > 1) {
        map.fitBounds(L.latLngBounds(markers.map(m => [m.lat, m.lng] as [number, number])));
      } else if (markers.length === 1) {
        map.setView([markers[0].lat, markers[0].lng], 15);
      } else if (paths.length > 1) {
        map.fitBounds(L.latLngBounds(paths.map(p => [p.lat, p.lng] as [number, number])));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [markers, paths]);

  if (error) {
    return (
      <div
        style={{ width: '100%', height, borderRadius: '0.5rem' }}
        className="flex items-center justify-center bg-red-50 text-red-500 shadow-md"
      >
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height, borderRadius: '0.5rem' }}
      className="shadow-md"
    />
  );
}
