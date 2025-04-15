"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PageDetailDesription } from "@/components/organisms/details/description";
import { FeaturedImage } from "@/components/organisms/details/featured-image";
import { Recommendation } from "@/components/organisms/details/recommendation";
import { LocationView } from "@/components/organisms/details/LocationView";
import { getVacationDetails, getVacationItemById } from "@/services/vacation";
import { VacationItemTypes } from "@/services/types";

// 加载指示器组件
function LoadingIndicator() {
  return (
    <div className="container mt-10 flex flex-col items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
      <p className="mt-4 text-lg font-medium text-gray-700">数据加载中...</p>
    </div>
  );
}

export default function DetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [data, setData] = useState<VacationItemTypes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          const item = await getVacationItemById(slug);
          setData(item);
        }
      } catch (error) {
        console.error("获取详情数据失败:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!data) {
    return (
      <div className="container mt-10 text-center">
        <h1 className="text-2xl font-semibold text-red-500">未找到项目</h1>
        <p className="mt-4 text-gray-600">无法加载所请求的旅游项目</p>
      </div>
    );
  }

  return (
    <main className="mb-[7.5rem] mt-10">
      <h1 className="container text-3xl font-semibold text-[#232631] md:text-4xl">
        {data.title}
      </h1>
      <section className="container mt-6">
        <FeaturedImage item={data} />
      </section>
      <PageDetailDesription item={data} />
      <LocationView item={data} />
      <Recommendation />
    </main>
  );
}
