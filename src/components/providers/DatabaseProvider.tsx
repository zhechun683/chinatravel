"use client";

import { useEffect, useState } from "react";
import { initializeDatabase } from "@/services/dbInitializer";

// 创建一个简单的加载指示器组件
function LoadingIndicator() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <div className="rounded-md bg-white p-4 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
          <p className="mt-2 text-lg font-medium text-gray-700">数据加载中...</p>
        </div>
      </div>
    </div>
  );
}

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [isInitializing, setIsInitializing] = useState(true);
  
  useEffect(() => {
    // 初始化数据库
    const init = async () => {
      try {
        await initializeDatabase();
      } catch (error) {
        console.error("数据库初始化失败:", error);
      } finally {
        // 无论成功或失败，都设置初始化完成
        // 添加短暂延迟，确保数据已加载
        setTimeout(() => {
          setIsInitializing(false);
        }, 800);
      }
    };

    init();
  }, []);

  return (
    <>
      {isInitializing && <LoadingIndicator />}
      {children}
    </>
  );
} 