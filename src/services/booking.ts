import { db } from "@/config/indexedDb"; // 引用 Dexie 配置
import { BookingDataTypes, MemberTypes, PaymentTypes } from "@/services/types/index";
// 改为使用内部生成 ID，无需 uuid 库
// import { v4 as uuidv4 } from 'uuid'; // 需要安装 uuid 库

// 定义包含所有需要字段的表单提交数据类型
export interface BookingFormData {
  amount: number;
  item_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  card_holder_name: string;
  card_number: number;
  cvc: number;
}

// 生成UUID的函数，处理不同环境
function generateUUID() {
  try {
    // 优先使用crypto API
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    // 手动生成简单的UUID
    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 1000000000);
    return `${timestamp}-${randomPart}`;
  } catch (error) {
    // 生成基于时间戳的简单ID
    console.warn('无法生成标准UUID，使用时间戳替代');
    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 1000000000);
    return `${timestamp}-${randomPart}`;
  }
}

// 获取当前登录用户ID
function getCurrentUserId(): string | null {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('currentUserId');
  }
  return null;
}

export async function setNewBooking(bookingData: BookingFormData) {
  try {
    console.log("开始创建预订...");
    
    // 检查是否在浏览器环境
    if (!db) {
      console.error("浏览器环境不可用");
      throw new Error("Browser environment required");
    }

    // 生成唯一 ID
    const bookingId = generateUUID();
    let memberId: string;
    const paymentId = generateUUID();
    const invoice = Math.floor(Math.random() * 1000000); // 随机生成发票号

    // 检查是否有当前登录用户
    const currentUserId = getCurrentUserId();
    let memberData: MemberTypes;

    if (currentUserId) {
      // 使用现有用户
      memberId = currentUserId;
      const existingMember = await db.members.get(currentUserId);
      
      if (existingMember) {
        console.log("使用现有用户:", existingMember);
        memberData = {
          ...existingMember,
          // 如果预订表单中的信息与用户信息不同，更新用户信息
          first_name: bookingData.first_name || existingMember.first_name,
          last_name: bookingData.last_name || existingMember.last_name,
          email: bookingData.email || existingMember.email,
          phone_number: bookingData.phone_number || existingMember.phone_number
        };
        
        // 更新用户信息
        await db.members.update(currentUserId, memberData);
        console.log("用户信息已更新");
      } else {
        // 用户ID存在但找不到用户记录，创建新用户
        console.log("找不到现有用户，创建新用户");
        memberId = generateUUID();
        memberData = {
          id: memberId,
          first_name: bookingData.first_name,
          last_name: bookingData.last_name,
          email: bookingData.email,
          phone_number: bookingData.phone_number
        };
      }
    } else {
      // 创建新用户
      memberId = generateUUID();
      memberData = {
        id: memberId,
        first_name: bookingData.first_name,
        last_name: bookingData.last_name,
        email: bookingData.email,
        phone_number: bookingData.phone_number
      };
      
      // 设置为当前用户
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('currentUserId', memberId);
      }
    }

    console.log("生成的ID:", { bookingId, memberId, paymentId });
    
    // 创建支付记录
    const paymentData: PaymentTypes = {
      id: paymentId,
      created_at: new Date().toISOString(),
      card_number: bookingData.card_number,
      card_holder_name: bookingData.card_holder_name,
      cvc: bookingData.cvc
    };
    
    // 创建预订记录
    const booking: BookingDataTypes = {
      id: bookingId,
      invoice: invoice,
      amount: bookingData.amount,
      total: bookingData.amount, // 可以根据需求计算总额
      item_id: bookingData.item_id,
      member_id: memberId,
      payment_id: paymentId
    };

    console.log("准备写入数据到IndexedDB...");
    console.log("会员数据:", memberData);
    console.log("支付数据:", paymentData);
    console.log("预订数据:", booking);

    // 更新 items 表中的 sum_booking 字段
    const item = await db.items.get(bookingData.item_id);
    if (item) {
      const currentBookings = item.sum_booking || 0;
      await db.items.update(bookingData.item_id, {
        sum_booking: currentBookings + 1
      });
      console.log(`更新商品(${bookingData.item_id})预订计数: ${currentBookings} -> ${currentBookings + 1}`);
    } else {
      console.warn(`找不到商品: ${bookingData.item_id}`);
    }

    // 使用事务确保数据一致性
    try {
      await db.transaction('rw', [db.members, db.payments, db.bookings], async () => {
        if (db) {
          // 如果是新用户或用户ID存在但找不到用户记录，添加新用户
          if (!currentUserId || !(await db.members.get(memberId))) {
            await db.members.add(memberData);
            console.log("会员数据已添加");
          }
          
          await db.payments.add(paymentData);
          console.log("支付数据已添加");
          
          await db.bookings.add(booking);
          console.log("预订数据已添加");
        }
      });
      console.log("事务完成，所有数据已保存");
    } catch (txError: any) {
      console.error("数据库事务失败:", txError);
      throw txError;
    }

    return bookingId;
  } catch (error: any) {
    console.error("预订失败:", error);
    throw new Error(`failed to create new booking: ${error.message}`);
  }
}
