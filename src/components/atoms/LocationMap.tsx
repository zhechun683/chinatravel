'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export type LocationMapProps = {
  latitude: number;
  longitude: number;
  address?: string;
  name?: string;
};

// Fix Leaflet marker icon issues in Next.js
const customIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function LocationMap({ latitude, longitude, address, name }: LocationMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Handle map creation after component is mounted
  useEffect(() => {
    if (isMounted && mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="relative h-[300px] w-full animate-pulse bg-gray-200 rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup>
            <strong>{name || 'Location'}</strong>
            <br />
            {address || 'No address information available'}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
} 