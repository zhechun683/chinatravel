"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/atoms/button";
import { getSingleVacationItem } from "@/services/vacation";
import { VacationItemTypes } from "@/services/types/index";

export function TripPackage() {
  const [item, setItem] = useState<VacationItemTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSingleVacationItem("Bali - Nusa Penida Island Tour");
        if (data) {
          setItem(data);
        } else {
          // 如果没有找到指定项目，设置错误状态
          setError(true);
        }
      } catch (error) {
        console.error("Failed to fetch trip package data", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 确定按钮的目标链接
  const packageLink = loading 
    ? "#" 
    : item 
      ? `/vacation/${item.id}` 
      : "/vacation/afa0a61e-cafd-4aae-92d6-65071cb9abdf"; // 在无项目时提供默认ID

  return (
    <section className="container mt-[4rem]">
      <div className="mb-[2.5rem]">
        <span className="text-2xl font-bold text-secondary">
          Our Recommendations
        </span>
        <h2 className="mt-2 text-4xl font-bold text-[#232631] lg:text-5xl">
          Popular Tourist Attractions
        </h2>
      </div>
      
      <div className="flex flex-wrap items-center gap-x-[3.75rem] gap-y-10">
        <div className="order-2 w-full md:max-w-max">
          <p className="mb-4 text-xl font-bold leading-[2rem] text-[#000000]">
            Discover the joy of traveling in China.<br />
            Tap below to find out more!
          </p>
          
          <p className="mb-3 text-base font-normal text-[#7B7B7B]">
            The recommended attractions this time are:<br />
            Forbidden City in Beijing &amp; West Lake in Hangzhou
          </p>
          
          <ul className="mt-[1.875rem] flex flex-col gap-[1.625rem] md:flex-row">
            <li>
              <span className="text-xl font-semibold text-[#232631]">20+</span>
              <br />
              <span className="text-base font-normal text-[#7B7B7B]">
                Destination
              </span>
            </li>
            <li>
              <span className="text-xl font-semibold text-[#232631]">80+</span>
              <br />
              <span className="text-base font-normal text-[#7B7B7B]">
                Activities
              </span>
            </li>
            <li>
              <span className="text-xl font-semibold text-[#232631]">
                270K+
              </span>
              <br />
              <span className="text-base font-normal text-[#7B7B7B]">
                Happy Tourists
              </span>
            </li>
          </ul>
          
          <div className="mt-[1.875rem] flex flex-wrap items-center gap-[1.875rem]">
            <Button asChild className="w-full text-lg md:max-w-max">
              <Link href={packageLink}>Choose Package</Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full text-lg text-[#7B7B7B] md:max-w-max"
            >
              View More
            </Button>
          </div>
        </div>
        <div className="order-1 flex flex-wrap">
          <div className="flex h-[25.25rem] w-[19rem] shrink-0 items-center justify-center rounded-3xl border-4 border-secondary">
            <figure className="relative before:absolute before:inset-0 before:block before:h-full before:w-full before:rounded-3xl before:bg-gradient-to-b before:from-black/0 before:to-black/30 before:content-['']">
              <Image
                src="/images/forbidden-city-up.png"
                alt="Forbidden City"
                width={280}
                height={380}
                quality={90}
              />
              <div className="absolute bottom-7 left-6">
                <div className="flex items-center gap-x-[.125rem]">
                  <Star size={14} color="#FF7A00" fill="#FF7A00" />
                  <Star size={14} color="#FF7A00" fill="#FF7A00" />
                  <Star size={14} color="#FF7A00" fill="#FF7A00" />
                  <Star size={14} color="#FF7A00" fill="#FF7A00" />
                  <Star size={14} color="#FF7A00" fill="#FF7A00" />
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  Forbidden City
                </h3>
                <span className="flex items-center gap-x-1 text-base font-normal text-[#EDEDED]">
                  <MapPin size={16} className="text-[##D9D9D9]" /> Beijing,
                  China
                </span>
              </div>
            </figure>
          </div>
          <div className="flex h-[25.25rem] w-[19rem] shrink-0 items-center justify-center rounded-3xl">
            <figure className="relative before:absolute before:inset-0 before:block before:h-full before:w-full before:rounded-3xl before:bg-gradient-to-b before:from-black/0 before:to-black/30 before:content-['']">
              <Image
                src="/images/west-lake-up.png"
                alt="West Lake"
                width={280}
                height={380}
                quality={90}
              />
              <div className="absolute bottom-7 left-6">
                <div className="flex items-center gap-x-[.125rem]">
                  <Star size={14} color="#FF7A00" fill="#FF7A00" />
                  <Star size={14} color="#FF7A00" fill="#FF7A00" />
                  <Star size={14} color="#FF7A00" fill="#FF7A00" />
                  <Star size={14} color="#FF7A00" fill="#FF7A00" />
                  <Star size={14} color="#FF7A00" fill="#FF7A00" />
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  West Lake
                </h3>
                <span className="flex items-center gap-x-1 text-base font-normal text-[#EDEDED]">
                  <MapPin size={16} className="text-[##D9D9D9]" /> Hangzhou,
                  China
                </span>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
