"use client";

import { db } from "@/config/indexedDb";
import { VacationItemTypes } from "./types";

// Generate a more evenly distributed random rating between 4.7-5.0
function generateRandomRating() {
  // Define an array of possible rating values for a more even distribution
  const possibleRatings = [4.7, 4.8, 4.9, 4.9, 4.8, 4.7];
  // Randomly select a rating value
  const randomIndex = Math.floor(Math.random() * possibleRatings.length);
  return possibleRatings[randomIndex];
}

// Famous Chinese attractions data
const realVacations: VacationItemTypes[] = [
  {
    id: "a5518ffd-51e4-4c6e-898f-bc9b5d2418be",
    country: "China",
    unit: "person",
    title: "Great Wall",
    price: 35,
    city: "Beijing",
    rating: generateRandomRating(),
    description: "Experience one of the world's greatest wonders, a magnificent ancient structure that stretches over rugged mountains and scenic valleys. Built over 2,000 years ago, this engineering marvel offers breathtaking panoramic views and an unforgettable journey through China's imperial history.",
    sum_booking: 0,
    image: "images/great-wall.png",
    location: {
      latitude: 40.4319,
      longitude: 116.5704
    }
  },
  {
    id: "640dc1b1-49b3-41da-8ef2-ed23e109e7e9",
    country: "China",
    unit: "person",
    title: "Reed Flute Cave",
    price: 22,
    city: "Guilin",
    rating: generateRandomRating(),
    description: "Explore the magical underground palace of Guilin, a natural limestone cave illuminated with colorful lights that create a surreal atmosphere. The cave features spectacular formations of stalactites, stalagmites, and stone pillars that have been shaped over millennia.",
    sum_booking: 0,
    image: "images/reed-flute-cave.png",
    location: {
      latitude: 25.2856,
      longitude: 110.4308
    }
  },
  {
    id: "50781ee3-f778-49fe-8226-8a64549fc658",
    country: "China",
    unit: "person",
    title: "Zhangjiajie National Forest",
    price: 38,
    city: "Zhangjiajie",
    rating: generateRandomRating(),
    description: "Visit the stunning landscape that inspired the floating mountains in the movie Avatar. This UNESCO World Heritage site features thousands of sandstone pillars rising from the misty valleys, creating one of the most extraordinary natural sceneries in the world.",
    sum_booking: 0,
    image: "images/zhangjiajie.png",
    location: {
      latitude: 29.3249,
      longitude: 110.4346
    }
  },
  {
    id: "a96f468d-39ed-48b5-8a55-092b48fd99ee",
    country: "China",
    unit: "person",
    title: "Three Gorges Dam",
    price: 20,
    city: "Yichang",
    rating: generateRandomRating(),
    description: "Witness the world's largest hydroelectric dam, an engineering masterpiece spanning the mighty Yangtze River. The Three Gorges Dam provides incredible views of the surrounding mountains and offers insights into one of humanity's most ambitious construction projects.",
    sum_booking: 0,
    image: "images/three-gorges.png",
    location: {
      latitude: 30.8226,
      longitude: 111.0037
    }
  },
  {
    id: "d5ebe524-e202-4065-b41c-6ee333dc3602",
    country: "China",
    unit: "person",
    title: "Huangshan (Yellow Mountain)",
    price: 40,
    city: "Huangshan",
    rating: generateRandomRating(),
    description: "Discover the legendary Yellow Mountain, famous for its peculiarly-shaped granite peaks, hot springs, pine trees, and views of clouds touching the mountainsides. This UNESCO World Heritage site has inspired Chinese artists and poets for centuries with its otherworldly beauty.",
    sum_booking: 0,
    image: "images/yellow-mountain.png",
    location: {
      latitude: 30.1397,
      longitude: 118.1738
    }
  },
  {
    id: "ad69dd5f-5b5c-42b6-a810-fc5a9289c4d6",
    country: "China",
    unit: "person",
    title: "Li River Cruise",
    price: 45,
    city: "Guilin",
    rating: generateRandomRating(),
    description: "Embark on a picturesque cruise along the Li River, where you'll be surrounded by dramatic limestone karst landscapes that appear on the Chinese 20 yuan note. The journey offers breathtaking views of bamboo groves, traditional fishing villages, and mist-covered hills.",
    sum_booking: 0,
    image: "images/li-river.png",
    location: {
      latitude: 25.2369,
      longitude: 110.2664
    }
  },
  {
    id: "068afda5-7386-48e2-954d-33b19a727ebd",
    country: "China",
    unit: "person",
    title: "West Lake",
    price: 15,
    city: "Hangzhou",
    rating: 5.0, // Fixed rating 5.0
    description: "Stroll around the enchanting West Lake, a freshwater lake surrounded by gardens, pagodas, and temples. Marco Polo described Hangzhou as 'the finest and most splendid city in the world' largely due to this UNESCO World Heritage site, which has inspired poets and artists for centuries.",
    sum_booking: 0,
    image: "images/west-lake.png",
    location: {
      latitude: 30.2590,
      longitude: 120.1445
    }
  },
  {
    id: "c74f4bb3-76a3-478c-8907-3c394ae5fb22",
    country: "China",
    unit: "person",
    title: "Jiuzhaigou Valley",
    price: 30,
    city: "Sichuan",
    rating: generateRandomRating(),
    description: "Explore the fairytale landscape of Jiuzhaigou Valley, a nature reserve renowned for its multi-level waterfalls, colorful lakes, and snow-capped peaks. The crystal-clear waters reflect the surrounding mountains and forests, creating spectacular views that change with the seasons.",
    sum_booking: 0,
    image: "images/jiuzhaigou.png",
    location: {
      latitude: 33.1747,
      longitude: 103.9233
    }
  },
  {
    id: "afa0a61e-cafd-4aae-92d6-65071cb9abdf",
    country: "China",
    unit: "person",
    title: "Forbidden City",
    price: 28,
    city: "Beijing",
    rating: 5.0, // Fixed rating 5.0
    description: "Step into the magnificent imperial palace complex at the heart of Beijing, home to 24 Chinese emperors over 500 years. This UNESCO World Heritage site contains the largest collection of preserved ancient wooden structures in the world, with nearly 9,000 rooms filled with priceless artifacts and rich history. Explore the grand halls, intricate gardens, and learn about the fascinating stories of court intrigues and imperial ceremonies. The Forbidden City represents the pinnacle of traditional Chinese palatial architecture and provides visitors with an authentic glimpse into China's imperial past.",
    sum_booking: 0,
    image: "images/forbidden-city.png",
    location: {
      latitude: 39.9163,
      longitude: 116.3972
    }
  },
  {
    id: "b78e3d2a-6f91-4c2e-b8d7-12e9f87a4561",
    country: "China",
    unit: "person",
    title: "Terracotta Army",
    price: 30,
    city: "Xi'an",
    rating: generateRandomRating(),
    description: "Marvel at one of the greatest archaeological discoveries of the 20th century - an army of thousands of life-sized clay soldiers, each with unique facial features, built to guard Emperor Qin Shi Huang's tomb over 2,200 years ago.",
    sum_booking: 0,
    image: "images/terracotta-army.png",
    location: {
      latitude: 34.3841,
      longitude: 109.2785
    }
  },
  {
    id: "9c724f32-8891-4ae1-b8c9-36df9175a4b2",
    country: "China",
    unit: "person",
    title: "Potala Palace",
    price: 32,
    city: "Lhasa",
    rating: generateRandomRating(),
    description: "Visit the magnificent former residence of the Dalai Lama, perched atop Marpo Ri hill in Tibet. This 13-story, 1,000-room palace complex showcases stunning Tibetan architecture, precious artifacts, and religious statues while offering panoramic views of Lhasa.",
    sum_booking: 0,
    image: "images/potala-palace.png",
    location: {
      latitude: 29.6575,
      longitude: 91.1178
    }
  },
  {
    id: "e5d2a075-3a1c-4b58-a09f-0813f7713d32",
    country: "China",
    unit: "person",
    title: "Summer Palace",
    price: 18,
    city: "Beijing",
    rating: generateRandomRating(),
    description: "Wander through the exquisite gardens, pavilions, and temples of this imperial retreat. The Summer Palace features the stunning Kunming Lake, the elegant Long Corridor, and beautiful traditional architecture, all set against the backdrop of Longevity Hill.",
    sum_booking: 0,
    image: "images/summer-palace.png", // Using real Summer Palace image
    location: {
      latitude: 39.9988,
      longitude: 116.2748
    }
  },
  {
    id: "f8a6e9c1-7b5d-4e3f-9a2d-b1c4e8f9d7a5",
    country: "China",
    unit: "person",
    title: "Leshan Giant Buddha",
    price: 25,
    city: "Leshan",
    rating: generateRandomRating(),
    description: "Stand in awe before the world's largest stone Buddha statue, carved into the cliff face of Lingyun Mountain. This 71-meter tall sitting Buddha overlooks the confluence of three rivers and has been watching over the region for over 1,200 years.",
    sum_booking: 0,
    image: "images/leshan-buddha.png",
    location: {
      latitude: 29.5446,
      longitude: 103.7756
    }
  }
];

// Initialize database function
export async function initializeDatabase() {
  try {
    if (!db) {
      console.warn("Cannot initialize database: Browser environment unavailable");
      return;
    }

    // Check if the database already has data
    const itemCount = await db.items.count();
    
    // If the database is empty, add real data
    if (itemCount === 0) {
      console.log("Initializing database...");
      
      // Add all data
      for (const item of realVacations) {
        await db.items.add(item);
      }
      
      console.log("Database initialization complete");
    } else {
      console.log("Database already contains data, skipping initialization");
      
      // If needed, you can add code to update existing data
      console.log("Updating database with Chinese attractions...");
      
      // Delete all existing data
      await db.items.clear();
      
      // Add Chinese attractions data
      for (const item of realVacations) {
        await db.items.add(item);
      }
      
      console.log("Database update complete");
    }
  } catch (error) {
    console.error("Failed to initialize database", error);
  }
} 