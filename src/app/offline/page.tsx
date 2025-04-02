import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Logo } from "@/components/atoms/logo";

export const metadata: Metadata = {
  title: "Offline | ChinaTravel",
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="mb-8">
        <Logo isDisplayMobile />
      </div>
      <h1 className="mb-4 text-3xl font-bold">You are currently offline</h1>
      <p className="mb-8 max-w-md text-gray-600">
        It looks like your network connection is interrupted. Please check your network connection and try again.
        Some features may still be available in offline mode.
      </p>
      <Button asChild>
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </Button>
    </div>
  );
} 