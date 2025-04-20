'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
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

// 自定义用户位置图标
const UserLocationIcon = L.icon({
  iconUrl: '/images/user-location.svg', // 使用SVG图标
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// 地图视图自动调整组件
function MapViewAdjuster({ attractions, userLocation }: { 
  attractions: [number, number], 
  userLocation?: [number, number] 
}) {
  const map = useMap();
  
  useEffect(() => {
    if (userLocation) {
      // 如果有用户位置，创建边界包含景点和用户位置
      const bounds = L.latLngBounds([attractions, userLocation]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, attractions, userLocation]);
  
  return null;
}

interface LocationMapProps {
  location: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description?: string;
  zoom?: number;
  height?: string;
  userLocation?: {
    latitude: number;
    longitude: number;
  } | null;
}

export default function LocationMap({ 
  location, 
  title, 
  description, 
  zoom = 13, 
  height = '400px',
  userLocation = null
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

  // 准备景点位置坐标
  const attractionPosition: [number, number] = [location.latitude, location.longitude];
  
  // 准备用户位置坐标（如果有）
  const userPosition: [number, number] | undefined = userLocation 
    ? [userLocation.latitude, userLocation.longitude]
    : undefined;
  
  // 准备连接线的点
  const polylinePoints = userPosition 
    ? [attractionPosition, userPosition] 
    : [];

  return (
    <div style={{ height, width: '100%' }} className="rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={attractionPosition}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* 景点标记 */}
        <Marker 
          position={attractionPosition}
          icon={DefaultIcon}
        >
          <Popup>
            <div>
              <h3 className="font-semibold">{title}</h3>
              {description && <p>{description}</p>}
            </div>
          </Popup>
        </Marker>
        
        {/* 用户位置标记（如果有） */}
        {userPosition && (
          <Marker 
            position={userPosition}
            icon={UserLocationIcon}
          >
            <Popup>
              <div>
                <h3 className="font-semibold">您的位置</h3>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* 连接线（如果有用户位置） */}
        {polylinePoints.length > 0 && (
          <Polyline 
            positions={polylinePoints}
            color="#3388ff"
            weight={3}
            opacity={0.7}
            dashArray="10, 10"
          />
        )}
        
        {/* 视图自动调整 */}
        {userPosition && (
          <MapViewAdjuster 
            attractions={attractionPosition} 
            userLocation={userPosition} 
          />
        )}
      </MapContainer>
    </div>
  );
} 