"use client";

import { useState } from "react";
import Image from "next/image";
import { VacationItemTypes } from "@/services/types";
import { getImagePath } from "@/services/utils";

interface FeaturedImageProps {
  item: VacationItemTypes;
}

export function FeaturedImage({ item }: FeaturedImageProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // 获取景点图片路径
  const mainImage = `/${item.image}`;
  
  // 根据景点类型选择合适的画廊图片
  const getGalleryImages = () => {
    // 所有中国景点图片
    const allImages = [
      "images/great-wall.png",
      "images/forbidden-city.png", 
      "images/reed-flute-cave.png",
      "images/li-river.png",
      "images/yellow-mountain.png", 
      "images/zhangjiajie.png",
      "images/potala-palace.png",
      "images/three-gorges.png",
      "images/west-lake.png",
      "images/jiuzhaigou.png",
      "images/terracotta-army.png",
      "images/leshan-buddha.png"
    ];
    
    // 移除当前主图，避免重复
    const availableImages = allImages.filter(img => img !== item.image);
    
    // 根据景点位置或类型选择适合的图片
    if (item.city === "Beijing") {
      // 北京景点(长城、故宫、颐和园)相关图片
      const beijingPreferred = [
        "images/great-wall.png",
        "images/forbidden-city.png",
        "images/west-lake.png",
        "images/terracotta-army.png"
      ].filter(img => img !== item.image);
      
      return beijingPreferred.length >= 4 ? 
        beijingPreferred.slice(0, 4) : 
        [...beijingPreferred, ...availableImages.filter(img => !beijingPreferred.includes(img))].slice(0, 4);
    } 
    else if (item.city === "Guilin") {
      // 桂林景点(芦笛岩、漓江)相关图片
      const guilinPreferred = [
        "images/reed-flute-cave.png",
        "images/li-river.png",
        "images/jiuzhaigou.png",
        "images/yellow-mountain.png"
      ].filter(img => img !== item.image);
      
      return guilinPreferred.length >= 4 ? 
        guilinPreferred.slice(0, 4) : 
        [...guilinPreferred, ...availableImages.filter(img => !guilinPreferred.includes(img))].slice(0, 4);
    }
    else if (item.title.includes("Mountain") || item.title.includes("Forest")) {
      // 山岳类景点相关图片
      const mountainPreferred = [
        "images/yellow-mountain.png",
        "images/zhangjiajie.png",
        "images/jiuzhaigou.png",
        "images/great-wall.png"
      ].filter(img => img !== item.image);
      
      return mountainPreferred.length >= 4 ? 
        mountainPreferred.slice(0, 4) : 
        [...mountainPreferred, ...availableImages.filter(img => !mountainPreferred.includes(img))].slice(0, 4);
    } 
    else if (item.title.includes("Lake") || item.title.includes("River")) {
      // 水景类景点相关图片
      const waterPreferred = [
        "images/west-lake.png",
        "images/li-river.png",
        "images/jiuzhaigou.png",
        "images/three-gorges.png"
      ].filter(img => img !== item.image);
      
      return waterPreferred.length >= 4 ? 
        waterPreferred.slice(0, 4) : 
        [...waterPreferred, ...availableImages.filter(img => !waterPreferred.includes(img))].slice(0, 4);
    }
    
    // 随机选择4张不同于主图的图片
    const randomImages = [...availableImages].sort(() => 0.5 - Math.random()).slice(0, 4);
    return randomImages;
  };
  
  const galleryImages = getGalleryImages();
  
  // 加载完成处理函数
  const handleImagesLoaded = () => {
    setImagesLoaded(true);
  };
  
  return (
    <div className="relative grid w-full max-w-[768px] grid-cols-2 gap-4 md:h-[376px] md:grid-cols-4 md:grid-rows-2">
      {!imagesLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-70">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
            <p className="mt-2 text-lg font-medium text-gray-700">Loading images...</p>
          </div>
        </div>
      )}
      
      <figure className="relative col-span-2 h-[376px] w-full overflow-hidden rounded-2xl md:row-span-2 md:h-full">
        <Image
          src={mainImage}
          alt={item.title}
          fill
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "center center" }}
          onLoad={handleImagesLoaded}
          onError={() => {
            // 图片加载失败时使用备用图片
            const img = document.querySelector('figure.col-span-2 img') as HTMLImageElement;
            if (img) img.src = '/images/1.png';
            handleImagesLoaded();
          }}
        />
      </figure>
      
      {galleryImages.map((img, index) => (
        <figure key={index} className="relative h-[160px] w-full overflow-hidden rounded-2xl md:h-full">
          <Image
            src={`/${img}`}
            alt={`${item.title} gallery ${index + 1}`}
            fill
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ 
              objectFit: "cover", 
              objectPosition: "center center"
            }}
            onError={(e) => {
              // 图片加载失败时使用备用图片
              const img = e.currentTarget as HTMLImageElement;
              img.src = `/images/${index + 2}.png`;
            }}
          />
        </figure>
      ))}
    </div>
  );
}
