"use client";

import { useEffect, useState } from "react";
import { initializeDatabase } from "@/services/dbInitializer";

// Create a simple loading indicator component
function LoadingIndicator() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <div className="rounded-md bg-white p-4 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
          <p className="mt-2 text-lg font-medium text-gray-700">Loading data...</p>
        </div>
      </div>
    </div>
  );
}

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [isInitializing, setIsInitializing] = useState(true);
  
  useEffect(() => {
    // Initialize database
    const init = async () => {
      try {
        await initializeDatabase();
      } catch (error) {
        console.error("Database initialization failed:", error);
      } finally {
        // Set initialization complete regardless of success or failure
        // Add a short delay to ensure data is loaded
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