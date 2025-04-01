"use client";

import { Button } from "@/components/atoms/button";
import { DestinationCard } from "@/components/molecules/destination-card";
import { getVacationItems } from "@/services/vacation";
import { useEffect, useState } from "react";
import { VacationItemTypes } from "@/services/types/index";

export function Destinations() {
  const [items, setItems] = useState<VacationItemTypes[]>([]);
  const [allItems, setAllItems] = useState<VacationItemTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Short delay to ensure database has initialized
        await new Promise(resolve => setTimeout(resolve, 100));
        // 获取前8个目的地
        const initialData = await getVacationItems(8);
        setItems(initialData);
        
        // 获取所有目的地（最多12个）
        const allData = await getVacationItems(12);
        setAllItems(allData);
      } catch (error) {
        console.error("Failed to fetch destination data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 处理"View More"按钮点击
  const handleViewMoreClick = () => {
    if (showAll) {
      // 如果当前显示所有目的地，则切换回只显示前8个
      setShowAll(false);
    } else {
      // 否则显示所有目的地
      setShowAll(true);
    }
  };

  // 根据showAll状态显示不同数量的目的地
  const displayItems = showAll ? allItems : items;

  return (
    <section className="container mt-[7.5rem]">
      <h2 className="text-center text-2xl font-semibold text-[#232631] lg:text-4xl">
        Explore the Beauty of China
      </h2>
      <p className="mx-auto mt-4 max-w-[24.3125rem] text-center text-base font-normal text-[#7B7B7B] lg:leading-[1.875rem]">
        Enjoy a stress-free adventure across China.
        Click the button to explore the details!
      </p>
      <ul className="mt-[3.75rem] flex flex-wrap justify-center gap-[1.875rem]">
        {loading ? (
          <p className="text-center text-[#7B7B7B]">Loading destinations...</p>
        ) : displayItems.length > 0 ? (
          displayItems.map((item) => (
            <li key={item.id}>
              <DestinationCard {...item} />
            </li>
          ))
        ) : (
          <p className="text-center text-[#7B7B7B]">No destination data available</p>
        )}
      </ul>
      <div className="mt-[3.75rem] text-center">
        <Button 
          variant="outline" 
          size="pill" 
          className="h-[3.4375rem] text-lg"
          onClick={handleViewMoreClick}
        >
          {showAll ? "Show Less" : "View More"}
        </Button>
      </div>
    </section>
  );
}
