import { db } from "@/config/indexedDb"; // 引用 Dexie 配置
import { VacationItemTypes } from "./types";

export async function getVacationItems(limit: number = 8, includeAll: boolean = false) {
  // 检查是否在浏览器环境
  if (!db) {
    return []; // 在服务器端返回空数组
  }
  // 从 IndexedDB 获取所有 vacation 项
  const allItems = await db.items.toArray();
  // 根据includeAll参数决定是否过滤"Bali - Nusa Penida Island Tour"
  const filteredItems = includeAll ? 
    allItems : 
    allItems.filter(item => item.title !== "Bali - Nusa Penida Island Tour");
  
  // 返回指定数量的项目
  return filteredItems.slice(0, limit);
}

export async function getSingleVacationItem(title: string) {
  // 检查是否在浏览器环境
  if (!db) {
    return null; // 在服务器端返回 null
  }
  // 根据 title 查找唯一 vacation 项
  return await db.items.where("title").equals(title).first();
}

// 新增：根据 ID 获取旅游项目
export async function getVacationItemById(id: string): Promise<VacationItemTypes | null> {
  // 检查是否在浏览器环境
  if (!db) {
    return null; // 在服务器端返回 null
  }
  // 根据 ID 查找唯一 vacation 项
  const item = await db.items.get(id);
  return item || null;
}

// 新增：根据 slug（ID）获取旅游详情
export async function getVacationDetails(slug: string): Promise<VacationItemTypes> {
  // 检查是否在浏览器环境
  if (!db) {
    // 在服务器端返回默认数据
    return {
      id: slug,
      title: "Loading...",
      city: "",
      country: "",
      unit: "person",
      price: 0,
      rating: 5,
      description: "",
      image: "",
      sum_booking: 0,
      location: {
        latitude: -8.409518,
        longitude: 115.188919
      }
    };
  }

  try {
    // 使用 getVacationItemById 函数获取数据
    const item = await getVacationItemById(slug);
    
    // 如果没有找到数据，返回默认值
    if (!item) {
      return {
        id: slug,
        title: "Bali Island Tour", // 提供一个默认标题
        city: "Bali",
        country: "Indonesia",
        unit: "person",
        price: 599,
        rating: 5,
        description: "Explore the beautiful Bali Island with our guided tour package. Experience stunning beaches, ancient temples, and vibrant culture.",
        image: "",
        sum_booking: 0,
        location: {
          latitude: -8.673464,
          longitude: 115.451266
        }
      };
    }
    
    // 如果项目没有位置信息，添加默认位置
    if (!item.location && item.city && item.country) {
      // 尝试添加预设位置
      const defaultLocations: Record<string, Record<string, { latitude: number; longitude: number }>> = {
        'Indonesia': {
          'Bali': { latitude: -8.409518, longitude: 115.188919 },
          'Lombok': { latitude: -8.585170, longitude: 116.097755 },
          'Jakarta': { latitude: -6.208763, longitude: 106.845599 }
        },
        'Iceland': {
          'Selajan': { latitude: 64.142478, longitude: -21.927349 }
        },
        'Italy': {
          'Wildsee': { latitude: 46.663181, longitude: 11.907545 }
        }
      };
      
      if (defaultLocations[item.country] && defaultLocations[item.country][item.city]) {
        item.location = defaultLocations[item.country][item.city];
      } else if (defaultLocations[item.country]) {
        // 使用国家的第一个城市位置
        const firstCity = Object.keys(defaultLocations[item.country])[0];
        if (firstCity) {
          item.location = defaultLocations[item.country][firstCity];
        }
      }
    }
    
    return item;
  } catch (error) {
    console.error("获取旅游详情失败", error);
    // 出错时返回默认数据
    return {
      id: slug,
      title: "Tour Package",
      city: "Destination City",
      country: "Country",
      unit: "person",
      price: 499,
      rating: 5,
      description: "A wonderful travel experience awaits you.",
      image: "",
      sum_booking: 0,
      location: {
        latitude: -8.409518,
        longitude: 115.188919
      }
    };
  }
}

// 新增：获取热门/推荐旅游项目(根据预订数量排序)
export async function getPopularVacationItems(limit: number = 4): Promise<VacationItemTypes[]> {
  // 检查是否在浏览器环境
  if (!db) {
    return []; // 在服务器端返回空数组
  }
  
  // 获取所有项目并按预订数量排序
  const allItems = await db.items.toArray();
  return allItems
    .sort((a, b) => (b.sum_booking || 0) - (a.sum_booking || 0))
    .slice(0, limit);
}

// 新增：根据国家筛选旅游项目
export async function getVacationItemsByCountry(country: string): Promise<VacationItemTypes[]> {
  // 检查是否在浏览器环境
  if (!db) {
    return []; // 在服务器端返回空数组
  }
  
  // 根据国家查找项目
  return await db.items.where("country").equals(country).toArray();
}
