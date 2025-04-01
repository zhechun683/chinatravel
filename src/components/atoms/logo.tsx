import Link from "next/link";
import { Map } from "lucide-react";
import { cn } from "@/utils/classnames";

interface LogoProps {
  className?: string;
  isDisplayMobile?: boolean;
  isDisplayDesktop?: boolean;
}

export function Logo({
  className,
  isDisplayMobile = true,
  isDisplayDesktop = true,
}: LogoProps) {
  return (
    <div>
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Map className="h-6 w-6 text-primary" />
          <span
            className={cn(
              "text-2xl font-semibold text-primary",
              isDisplayMobile ? "inline-block" : "hidden",
              className
            )}
          >
            ChinaTravel
          </span>
        </div>
      </Link>
    </div>
  );
}
