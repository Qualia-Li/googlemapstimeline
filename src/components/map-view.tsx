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
}

// Opening view, used until markers or a path arrive and reframe the map.
const DEFAULT_CENTER: [number, number] = [37.7749, -122.4194];
const DEFAULT_ZOOM = 10;

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
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function hasCoords(p: { lat: number; lng: number }): boolean {
  return Number.isFinite(p.lat) && Number.isFinite(p.lng);
}

export default function MapView({
  markers = [],
  paths = [],
  height = "600px",
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create the map once. `ready` gates the redraw effect below: refs alone
  // cannot, because setting a ref does not re-run an effect that bailed early.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const L = (await import('leaflet')).default;
        if (cancelled || !containerRef.current || mapRef.current) return;

        // Store the instance before anything that can throw, so cleanup can
        // always remove it.
        const map = L.map(containerRef.current);
        mapRef.current = map;
        map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);

        // ponytail: public OSM tiles, fine at this traffic. If loads grow past
        // OSM's fair-use policy, point this URL at a hosted basemap or self-host.
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        layerRef.current = L.layerGroup().addTo(map);
        if (!cancelled) setReady(true);
      } catch (err) {
        console.error("Error initializing map:", err);
        if (!cancelled) setError("Failed to initialize map");
      }
    })();

    return () => {
      cancelled = true;
      setReady(false);
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
    if (!ready) return;
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !mapRef.current || !layerRef.current) return;

      const map = mapRef.current;
      // Drop unusable coordinates before touching the map: Leaflet throws on
      // NaN, and the layers are already cleared by then.
      const pins = markers.filter(hasCoords);
      const line = paths.filter(hasCoords);

      try {
        layerRef.current.clearLayers();

        pins.forEach(m => {
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

        if (line.length >= 2) {
          L.polyline(
            line.map(p => [p.lat, p.lng] as [number, number]),
            { color: "#FF0000", opacity: 0.8, weight: 3 }
          ).addTo(layerRef.current);
        }

        if (pins.length > 1) {
          map.fitBounds(L.latLngBounds(pins.map(m => [m.lat, m.lng] as [number, number])));
        } else if (pins.length === 1) {
          map.setView([pins[0].lat, pins[0].lng], 15);
        } else if (line.length > 1) {
          map.fitBounds(L.latLngBounds(line.map(p => [p.lat, p.lng] as [number, number])));
        }
      } catch (err) {
        console.error("Error drawing map layers:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, markers, paths]);

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
