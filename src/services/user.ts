import { db } from "@/config/indexedDb";
import { MemberTypes, BookingDataTypes, VacationItemTypes } from "./types";

// 生成唯一ID的函数
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, 
          v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 从 localStorage 获取当前用户ID
function getCurrentUserId(): string | null {
  return localStorage.getItem('currentUserId');
}

// 设置当前用户ID到 localStorage
function setCurrentUserId(userId: string): void {
  localStorage.setItem('currentUserId', userId);
}

// 获取用户资料
export async function getUserProfile(): Promise<MemberTypes | null> {
  // 检查是否在浏览器环境
  if (!db) {
    console.error("浏览器环境不可用");
    return null;
  }

  try {
    // 获取当前用户ID
    let userId = getCurrentUserId();
    
    // 如果没有用户ID，尝试获取第一个用户或创建默认用户
    if (!userId) {
      // 检查是否有已存在的会员
      const members = await db.members.toArray();
      
      if (members.length > 0) {
        // 使用第一个会员
        userId = members[0].id;
        setCurrentUserId(userId);
      } else {
        // 创建默认用户
        const defaultUser: MemberTypes = {
          id: generateUUID(),
          first_name: '未设置',
          last_name: '未设置',
          email: 'user@example.com',
          phone_number: 13800138000
        };
        
        // 添加到数据库
        await db.members.add(defaultUser);
        userId = defaultUser.id;
        setCurrentUserId(userId);
        
        return defaultUser;
      }
    }
    
    // 获取用户资料
    const userProfile = await db.members.get(userId);
    return userProfile || null;
  } catch (error) {
    console.error("获取用户资料失败", error);
    return null;
  }
}

// 更新用户资料
export async function updateUserProfile(profile: MemberTypes): Promise<boolean> {
  // 检查是否在浏览器环境
  if (!db) {
    console.error("浏览器环境不可用");
    return false;
  }

  try {
    // 获取当前用户ID
    const userId = getCurrentUserId();
    
    if (!userId) {
      console.error("未找到当前用户ID");
      return false;
    }
    
    // 确保更新的是当前用户
    if (profile.id !== userId) {
      profile.id = userId;
    }
    
    // 更新用户资料
    await db.members.update(userId, profile);
    return true;
  } catch (error) {
    console.error("更新用户资料失败", error);
    return false;
  }
}

// 从预订信息获取用户资料
export async function getUserFromBooking(bookingId: string): Promise<MemberTypes | null> {
  // 检查是否在浏览器环境
  if (!db) {
    console.error("浏览器环境不可用");
    return null;
  }

  try {
    // 获取预订信息
    const booking = await db.bookings.get(bookingId);
    
    if (!booking || !booking.member_id) {
      return null;
    }
    
    // 获取用户资料
    const userProfile = await db.members.get(booking.member_id);
    return userProfile || null;
  } catch (error) {
    console.error("获取预订用户资料失败", error);
    return null;
  }
}

// 获取用户的所有预订记录
export async function getUserBookings(): Promise<Array<BookingDataTypes & { itemDetails?: VacationItemTypes; date?: string }>> {
  // 检查是否在浏览器环境
  if (!db) {
    console.error("浏览器环境不可用");
    return [];
  }

  try {
    // 获取当前用户ID
    const userId = getCurrentUserId();
    
    if (!userId) {
      console.error("未找到当前用户ID");
      return [];
    }
    
    // 获取用户所有预订
    const bookings = await db.bookings
      .where('member_id')
      .equals(userId)
      .toArray();
    
    // 获取每个预订对应的旅行项目详情
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        // 获取旅行项目详情
        let item: VacationItemTypes | undefined;
        let payment: any = null;
        
        if (db) {
          item = await db.items.get(booking.item_id);
          
          // 获取支付信息以获取日期
          if (booking.payment_id) {
            payment = await db.payments.get(booking.payment_id);
          }
        }
        
        // 格式化日期
        const date = payment?.created_at 
          ? new Date(payment.created_at).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          : undefined;
        
        return {
          ...booking,
          itemDetails: item,
          date
        };
      })
    );
    
    // 按日期降序排序（最新的在前面）
    return bookingsWithDetails.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error("获取用户预订记录失败", error);
    return [];
  }
} 