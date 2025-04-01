"use client";

import { useEffect, useState } from "react";
import { DestinationCard } from "@/components/molecules/destination-card";
import { getPopularVacationItems } from "@/services/vacation";
import { VacationItemTypes } from "@/services/types";

export function Recommendation() {
  const [recommendations, setRecommendations] = useState<VacationItemTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Delay to ensure database is loaded
        await new Promise(resolve => setTimeout(resolve, 300));
        const data = await getPopularVacationItems(4);
        
        // Filter out "Bali - Nusa Penida Island Tour"
        const filteredData = data.filter(item => item.title !== "Bali - Nusa Penida Island Tour");
        
        if (filteredData && filteredData.length > 0) {
          setRecommendations(filteredData);
        } else {
          // If no data is returned, use default recommendations
          setRecommendations(getDefaultRecommendations());
        }
      } catch (error) {
        console.error("Failed to get recommended destinations", error);
        // Use default data in case of error
        setRecommendations(getDefaultRecommendations());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="container">
      <div className="mt-16">
        <h3 className="text-2xl font-semibold text-[#232631] md:text-3xl">
          Recommended Destinations
        </h3>
        <ul className="mt-4 flex flex-wrap justify-center gap-[1.875rem]">
          {loading ? (
            <p className="text-center text-[#7B7B7B]">Loading destinations...</p>
          ) : recommendations.length > 0 ? (
            recommendations.map((item) => (
              <li key={item.id}>
                <DestinationCard {...item} />
              </li>
            ))
          ) : (
            <p className="text-center text-[#7B7B7B]">No destinations available</p>
          )}
        </ul>
      </div>
    </section>
  );
}

// Default recommendations
function getDefaultRecommendations(): VacationItemTypes[] {
  return [
    {
      id: "a96f468d-39ed-48b5-8a55-092b48fd99ee",
      image: "images/waterfall-haven.png",
      title: "Watefall Haven",
      country: "Iceland",
      city: "Selajan",
      rating: 5,
      price: 9,
      unit: "person",
      description: null,
      sum_booking: 0
    },
    {
      id: "d5ebe524-e202-4065-b41c-6ee333dc3602",
      image: "images/greatest-mountain.png",
      title: "Greatest Mountain",
      country: "Italy",
      city: "Wildsee",
      rating: 5,
      price: 12,
      unit: "person",
      description: null,
      sum_booking: 0
    },
    {
      id: "ad69dd5f-5b5c-42b6-a810-fc5a9289c4d6",
      image: "images/coconut-tree-river.png",
      title: "Coconut Tree River",
      country: "Indonesia",
      city: "Lombok",
      rating: 5,
      price: 6,
      unit: "person",
      description: null,
      sum_booking: 0
    },
    {
      id: "068afda5-7386-48e2-954d-33b19a727ebd",
      image: "images/circle-beach-play.png",
      title: "Circle Beach Play",
      country: "Indonesia",
      city: "Lombok",
      rating: 5,
      price: 5,
      unit: "person",
      description: null,
      sum_booking: 0
    }
  ];
}
