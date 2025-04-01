import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Logo } from "@/components/atoms/logo";

export const metadata: Metadata = {
  title: "离线 | ChinaTravel",
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="mb-8">
        <Logo isDisplayMobile />
      </div>
      <h1 className="mb-4 text-3xl font-bold">您当前处于离线状态</h1>
      <p className="mb-8 max-w-md text-gray-600">
        看起来您的网络连接中断了。请检查您的网络连接，然后再试一次。
        部分功能在离线模式下可能仍然可用。
      </p>
      <Button asChild>
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft size={18} />
          返回首页
        </Link>
      </Button>
    </div>
  );
} 