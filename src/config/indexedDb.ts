import Dexie from "dexie";
import { VacationItemTypes, BookingDataTypes, MemberTypes, PaymentTypes } from "@/services/types/index";

// 创建一个新的 Dexie 数据库
class ChinaTravelDB extends Dexie {
  items!: Dexie.Table<VacationItemTypes, string>; // 原 vacations 表
  bookings!: Dexie.Table<BookingDataTypes, string>;
  members!: Dexie.Table<MemberTypes, string>;
  payments!: Dexie.Table<PaymentTypes, string>;

  constructor() {
    super("ChinaTravelDB");

    // 定义数据库版本和表结构
    this.version(1).stores({
      items: "id, title, city, country, unit, price, rating, description, image, sum_booking", // 根据图片更新的表结构
      bookings: "id, invoice, amount, total, item_id, member_id, payment_id", // 根据图片更新的表结构
      members: "id, first_name, last_name, email, phone_number", // 新增表
      payments: "id, created_at, card_number, card_holder_name, cvc" // 新增表
    });
  }
}

// 检查是否在浏览器环境中
const isBrowser = typeof window !== 'undefined';

// 只在浏览器环境中创建数据库实例
export const db = isBrowser ? new ChinaTravelDB() : null;
