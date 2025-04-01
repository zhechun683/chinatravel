'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 解决Leaflet默认图标问题
const DefaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LocationMapProps {
  location: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description?: string;
  zoom?: number;
  height?: string;
}

export default function LocationMap({ 
  location, 
  title, 
  description, 
  zoom = 13, 
  height = '400px' 
}: LocationMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const mapRef = useRef(null);

  // 确保Leaflet在客户端渲染
  useEffect(() => {
    setIsMounted(true);
    
    // 设置默认图标
    if (typeof window !== 'undefined') {
      L.Marker.prototype.options.icon = DefaultIcon;
    }
    
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!location || !isMounted) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg bg-gray-100">
        <p className="text-gray-500">位置信息加载中...</p>
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%' }} className="rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker 
          position={[location.latitude, location.longitude]}
          icon={DefaultIcon}
        >
          <Popup>
            <div>
              <h3 className="font-semibold">{title}</h3>
              {description && <p>{description}</p>}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
} 