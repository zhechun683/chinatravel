'use client';

import { useState, useEffect } from 'react';
import { MapPin, Navigation, Globe, Maximize, Minimize } from 'lucide-react';
import dynamic from 'next/dynamic';
import { VacationItemTypes } from '@/services/types';

// 动态导入地图组件（客户端渲染）
const LocationMap = dynamic(() => import('@/components/molecules/LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center rounded-lg bg-gray-100">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
    </div>
  )
});

interface LocationViewProps {
  item: VacationItemTypes;
}

// 构建详细地址
function buildFullAddress(item: VacationItemTypes): string {
  const parts = [];
  
  if (item.title) parts.push(item.title);
  if (item.city) parts.push(item.city);
  if (item.country) parts.push(item.country);
  
  return parts.join(', ');
}

// 构建谷歌地图链接
function buildGoogleMapsLink(location: { latitude: number; longitude: number }, address: string): string {
  const baseUrl = 'https://www.google.com/maps';
  const query = encodeURIComponent(address);
  const coordinates = `${location.latitude},${location.longitude}`;
  
  return `${baseUrl}/search/?api=1&query=${query}&center=${coordinates}`;
}

// 预设的位置坐标，按城市和国家
const PRESET_LOCATIONS: Record<string, Record<string, { latitude: number; longitude: number }>> = {
  'Indonesia': {
    'Bali': { latitude: -8.409518, longitude: 115.188919 },
    'Lombok': { latitude: -8.585170, longitude: 116.097755 },
    'Jakarta': { latitude: -6.208763, longitude: 106.845599 }
  },
  'Iceland': {
    'Selajan': { latitude: 64.142478, longitude: -21.927349 },
    'Reykjavik': { latitude: 64.126521, longitude: -21.817439 }
  },
  'Italy': {
    'Wildsee': { latitude: 46.663181, longitude: 11.907545 },
    'Rome': { latitude: 41.902782, longitude: 12.496366 }
  }
};

// 尝试根据城市和国家获取位置
function getLocationFromCityCountry(city: string, country: string): { latitude: number; longitude: number } | null {
  if (PRESET_LOCATIONS[country] && PRESET_LOCATIONS[country][city]) {
    return PRESET_LOCATIONS[country][city];
  } else if (PRESET_LOCATIONS[country]) {
    // 返回国家的第一个城市位置作为回退
    const firstCity = Object.keys(PRESET_LOCATIONS[country])[0];
    if (firstCity) {
      return PRESET_LOCATIONS[country][firstCity];
    }
  }
  return null;
}

export function LocationView({ item }: LocationViewProps) {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(item.location || null);
  
  // 如果没有位置信息，尝试从城市和国家获取
  useEffect(() => {
    if (!location && item.city && item.country) {
      const cityLocation = getLocationFromCityCountry(item.city, item.country);
      if (cityLocation) {
        console.log(`Found the default location for ${item.city}, ${item.country}:`, cityLocation);
        setLocation(cityLocation);
      }
    }
  }, [location, item.city, item.country]);

  // 如果仍然没有位置信息，显示占位符
  if (!location) {
    return (
      <section className="container mt-10">
        <h2 className="text-2xl font-semibold text-[#232631]">Location</h2>
        <div className="mt-4 flex h-[200px] items-center justify-center rounded-lg bg-gray-100">
          <p className="text-gray-500">There is no geographical location information for this tourism project</p>
        </div>
      </section>
    );
  }

  const fullAddress = buildFullAddress(item);
  const googleMapsLink = buildGoogleMapsLink(location, fullAddress);

  return (
    <section className="container mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#232631]">Location</h2>
        <button 
          onClick={() => setIsMapExpanded(!isMapExpanded)}
          className="flex items-center gap-x-1 text-secondary hover:underline"
        >
          {isMapExpanded ? 
            <><Minimize size={18} /> Hide Map</> : 
            <><Maximize size={18} /> Expand Map</>
          }
        </button>
      </div>
      
      <div className="mt-4 flex flex-col gap-y-3">
        <div className="flex items-center gap-x-2">
          <MapPin size={20} className="flex-shrink-0 text-secondary" />
          <span className="text-lg text-[#7B7B7B]">{fullAddress}</span>
        </div>
        
        <div className="flex items-center gap-x-4">
          <a 
            href={googleMapsLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-x-1 text-secondary hover:underline"
          >
            <Globe size={16} />
            <span>View in Google Maps</span>
          </a>
          
          <a 
            href={`https://maps.apple.com/?q=${location.latitude},${location.longitude}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-x-1 text-secondary hover:underline"
          >
            <Navigation size={16} />
            <span>Get Navigation</span>
          </a>
        </div>
      </div>
      
      <div className={`mt-4 transition-all duration-500 ${isMapExpanded ? 'h-[500px]' : 'h-[300px]'}`}>
        <LocationMap 
          location={location}
          title={item.title}
          description={fullAddress}
          height="100%"
          zoom={isMapExpanded ? 14 : 12}
        />
      </div>
      
      <p className="mt-3 text-sm text-gray-500">
        Tip: Click on a marker on the map to view detailed information. Double-click or use the scroll wheel to zoom the map.
      </p>
    </section>
  );
} 