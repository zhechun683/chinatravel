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
      "images/leshan-buddha.png",
      "images/summer-palace.png"
    ];
    
    // 移除当前主图，避免重复
    const availableImages = allImages.filter(img => img !== item.image);
    
    // 为第二个大图选择合适的图片
    let secondMainImage;
    if (item.city === "Beijing") {
      // 如果是北京的景点，选择长城或故宫
      secondMainImage = item.title.includes("Forbidden City") ? 
        "images/great-wall.png" : "images/forbidden-city.png";
    } else if (item.city === "Hangzhou") {
      // 如果是杭州的景点，选择西湖
      secondMainImage = "images/west-lake.png";
    } else {
      // 其他情况，选择适合的景点图片
      const preferredImages = [
        "images/great-wall.png", 
        "images/forbidden-city.png",
        "images/summer-palace.png", 
        "images/west-lake.png"
      ];
      
      // 找到一个不是当前主图的首选图片
      secondMainImage = preferredImages.find(img => img !== item.image) || availableImages[0];
    }
    
    // 从可用图片中移除第二主图
    const remainingImages = availableImages.filter(img => img !== secondMainImage);
    
    // 随机选择3张其他图片
    const smallImages = [...remainingImages].sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // 返回整合的图片数组，第一个是第二主图，后面是小图
    return [secondMainImage, ...smallImages];
  };
  
  const galleryImages = getGalleryImages();
  
  // 加载完成处理函数
  const handleImagesLoaded = () => {
    setImagesLoaded(true);
  };
  
  return (
    <div className="relative grid w-full grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 md:h-[376px]">
      {!imagesLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-70">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
            <p className="mt-2 text-lg font-medium text-gray-700">Loading images...</p>
          </div>
        </div>
      )}
      
      {/* 左侧主图 */}
      <figure className="relative h-[376px] w-full overflow-hidden rounded-2xl md:col-span-5 md:row-span-2 md:h-full">
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
            const img = document.querySelector('figure:first-child img') as HTMLImageElement;
            if (img) img.src = '/images/forbidden-city.png';
            handleImagesLoaded();
          }}
        />
      </figure>
      
      {/* 右侧大图 */}
      <figure className="relative h-[376px] w-full overflow-hidden rounded-2xl md:col-span-5 md:row-span-2 md:h-full">
        <Image
          src={`/${galleryImages[0]}`}
          alt={`${item.title} featured gallery`}
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "center center" }}
          onError={(e) => {
            // 图片加载失败时使用备用图片
            const img = e.currentTarget as HTMLImageElement;
            img.src = '/images/great-wall.png';
          }}
        />
      </figure>
      
      {/* 右侧小图 */}
      {galleryImages.slice(1).map((img, index) => (
        <figure key={index} className="relative h-[160px] w-full overflow-hidden rounded-2xl md:col-span-2 md:h-full">
          <Image
            src={`/${img}`}
            alt={`${item.title} gallery ${index + 1}`}
            fill
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 16vw"
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
