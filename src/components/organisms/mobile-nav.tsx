"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/classnames";
import { Logo } from "../atoms/logo";
import { Button } from "@/components/atoms/button";

interface MobileNavProps {
  open: boolean;
}

export function MobileNav({ open }: MobileNavProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 top-20 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 rounded-md bg-white p-4">
        <Link href="/" className="flex items-center gap-x-2">
          <Logo isDisplayMobile />
        </Link>
        <nav className="mt-5">
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/"
                className={cn(
                  "text-center text-base",
                  pathname === "/"
                    ? "font-bold text-[#232631]"
                    : "font-medium text-[#7B7B7B]"
                )}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-center text-base font-medium text-[#7B7B7B]"
              >
                Attractions
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-center text-base font-medium text-[#7B7B7B]"
              >
                Hotels
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-center text-base font-medium text-[#7B7B7B]"
              >
                Activities
              </Link>
            </li>
            <li className="mt-4">
              <Button asChild variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary/10">
                <Link href="/account">
                  Account
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

