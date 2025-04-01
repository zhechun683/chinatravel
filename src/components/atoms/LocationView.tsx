'use client';

import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the map component to prevent SSR issues
const LocationMap = dynamic(() => import('./LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full animate-pulse bg-gray-200 rounded-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-400">Loading map...</p>
      </div>
    </div>
  ),
});

export type LocationViewProps = {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  address?: string;
  name?: string;
};

export default function LocationView({
  latitude,
  longitude,
  city,
  country,
  address,
  name,
}: LocationViewProps) {
  const formattedAddress = [address, city, country].filter(Boolean).join(', ');
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Location & Map</h3>
      
      <div className="flex flex-col space-y-2">
        <div className="flex items-start gap-2">
          <MapPin className="h-5 w-5 text-primary mt-0.5" />
          <span className="text-gray-700">
            {formattedAddress || 'Address information not available'}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-3 ml-7">
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            <span>View on Google Maps</span>
          </a>
          
          <a 
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            <Navigation className="h-4 w-4 mr-1" />
            <span>Get Directions</span>
          </a>
        </div>
      </div>
      
      <LocationMap 
        latitude={latitude} 
        longitude={longitude} 
        address={formattedAddress}
        name={name || city}
      />
    </div>
  );
} 