"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

// Use simple type declarations to avoid circular references
type GoogleMapType = any;
type GoogleMarkerType = any;
type GoogleInfoWindowType = any;
type GoogleLatLngBoundsType = any;
type GooglePolylineType = any;
type GoogleMapOptionsType = any;

interface GoogleMapProps {
  apiKey: string;
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
  mapOptions?: GoogleMapOptionsType;
}

export default function GoogleMap({ 
  apiKey, 
  markers = [], 
  paths = [],
  height = "600px",
  mapOptions = {} 
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMapType | null>(null);
  const [infoWindow, setInfoWindow] = useState<GoogleInfoWindowType | null>(null);
  const markersRef = useRef<GoogleMarkerType[]>([]);
  const pathsRef = useRef<GooglePolylineType | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapInstanceRef = useRef<GoogleMapType | null>(null);

  // Memoize the map options to prevent unnecessary reloads
  const memoizedMapOptions = useMemo(() => {
    const defaultMapOptions: any = {
      center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
      zoom: 10,
      mapTypeId: "roadmap", // Use string instead of google.maps.MapTypeId.ROADMAP
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: true,
      zoomControl: true,
    };
    return { ...defaultMapOptions, ...mapOptions };
  }, [mapOptions]);

  // Function to create map markers - memoized to prevent recreation
  const createMarkers = useCallback((mapInstance: GoogleMapType, infoWindowInstance: GoogleInfoWindowType) => {
    if (!mapInstance || !infoWindowInstance || markers.length === 0 || !window.google) return;

    try {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Add new markers
      const bounds = new window.google.maps.LatLngBounds();
      
      markers.forEach(markerData => {
        const marker = new window.google.maps.Marker({
          position: { lat: markerData.lat, lng: markerData.lng },
          map: mapInstance,
          title: markerData.title,
          icon: getMarkerIcon(markerData.type),
          animation: window.google.maps.Animation.DROP,
        });

        marker.addListener("click", () => {
          infoWindowInstance.setContent(`
            <div class="p-2">
              <h3 class="font-semibold">${markerData.title}</h3>
              <p>Lat: ${markerData.lat.toFixed(6)}, Lng: ${markerData.lng.toFixed(6)}</p>
            </div>
          `);
          infoWindowInstance.open(mapInstance, marker);
        });

        markersRef.current.push(marker);
        bounds.extend(marker.getPosition()!);
      });

      // Adjust map view based on markers
      if (markers.length > 1) {
        mapInstance.fitBounds(bounds);
      } else if (markers.length === 1) {
        mapInstance.setCenter({ lat: markers[0].lat, lng: markers[0].lng });
        mapInstance.setZoom(15);
      }
    } catch (err) {
      console.error("Error adding markers:", err);
    }
  }, [markers]);

  // Function to create path polylines - memoized to prevent recreation
  const createPaths = useCallback((mapInstance: GoogleMapType) => {
    if (!mapInstance || paths.length < 2 || !window.google) return;

    try {
      // Clear existing polyline
      if (pathsRef.current) {
        pathsRef.current.setMap(null);
        pathsRef.current = null;
      }

      // Create new polyline
      const polyline = new window.google.maps.Polyline({
        path: paths,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        map: mapInstance
      });

      pathsRef.current = polyline;

      // Fit bounds to show the entire path if not already set by markers
      if (paths.length > 1 && markersRef.current.length === 0) {
        const bounds = new window.google.maps.LatLngBounds();
        paths.forEach(point => bounds.extend(point));
        mapInstance.fitBounds(bounds);
      }
    } catch (err) {
      console.error("Error adding paths:", err);
    }
  }, [paths]);

  // Load the Google Maps API only once
  useEffect(() => {
    if (!apiKey) {
      setError("Google Maps API key is missing");
      return;
    }

    if (isMapLoaded) {
      return; // Don't reload if already loaded
    }

    let isMounted = true;
    
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"]
    });

    // Initialize map with a slight delay to ensure DOM is ready
    const initMap = async () => {
      try {
        // First load the API
        await loader.load();
        
        if (!isMounted || !mapRef.current) return;
        
        // Add a small delay to ensure the DOM element is ready
        setTimeout(() => {
          if (!isMounted || !mapRef.current || !window.google) return;

          try {
            // Create the map instance
            const mapInstance = new window.google.maps.Map(
              mapRef.current,
              memoizedMapOptions
            );
            
            // Create the info window
            const infoWindowInstance = new window.google.maps.InfoWindow();
            
            // Save references
            mapInstanceRef.current = mapInstance;
            setMap(mapInstance);
            setInfoWindow(infoWindowInstance);
            setIsMapLoaded(true);
            
            console.log("Map initialized successfully");
            
            // Initialize markers and paths
            createMarkers(mapInstance, infoWindowInstance);
            createPaths(mapInstance);
          } catch (err) {
            console.error("Error creating map instance:", err);
            setError("Failed to initialize map");
          }
        }, 300);
      } catch (err) {
        if (isMounted) {
          console.error("Error loading Google Maps:", err);
          setError("Failed to load Google Maps API");
        }
      }
    };

    initMap();

    return () => {
      isMounted = false;
    };
  }, [apiKey, memoizedMapOptions, createMarkers, createPaths]);

  // Update markers and paths when they change
  useEffect(() => {
    // Only update if map is already loaded
    if (isMapLoaded && mapInstanceRef.current && infoWindow) {
      createMarkers(mapInstanceRef.current, infoWindow);
      createPaths(mapInstanceRef.current);
    }
  }, [isMapLoaded, infoWindow, createMarkers, createPaths]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      // Clean up markers and polylines when component unmounts
      markersRef.current.forEach(marker => marker.setMap(null));
      if (pathsRef.current) pathsRef.current.setMap(null);
      
      // Clean up map instance
      if (mapInstanceRef.current) {
        // Reset references
        mapInstanceRef.current = null;
        setMap(null);
        setInfoWindow(null);
      }
    };
  }, []);

  function getMarkerIcon(type?: string): any {
    if (!type || !window.google) return null;
    
    // Match different types to different colors
    const iconColors: Record<string, string> = {
      "Home": "blue",
      "Work": "red",
      "School": "yellow",
      "Restaurant": "orange",
      "Shopping": "purple",
      "Doctor's Office": "green",
      "Entertainment": "pink",
      "Unknown": "ltblue",
      "Default": "gray"
    };
    
    const color = iconColors[type] || iconColors["Default"];
    
    return {
      url: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
      scaledSize: window.google.maps ? new window.google.maps.Size(32, 32) : null
    };
  }

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
      ref={mapRef} 
      style={{ width: '100%', height, borderRadius: '0.5rem' }} 
      className="shadow-md"
    />
  );
} 