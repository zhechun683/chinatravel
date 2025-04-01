"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/utils/classnames";
import { Logo } from "@/components/atoms/logo";
import { MobileNav } from "./mobile-nav";
import { Button } from "@/components/atoms/button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="container flex items-center justify-between py-6">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="hidden md:block">
          <Logo isDisplayMobile />
        </div>
        <Link href="/" className="md:hidden">
          <div className="flex items-center gap-x-2">
            <Logo isDisplayMobile />
          </div>
        </Link>
        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center gap-x-2">
            {open ? (
              <X size={28} className="text-primary" />
            ) : (
              <Logo isDisplayMobile={false} />
            )}
            <span
              className={cn(
                "text-xl font-bold text-primary",
                open ? "hidden" : "inline-block"
              )}
            >
              Menu
            </span>
          </div>
        </button>
      </div>
      <div className="hidden md:block">
        <ul className="inline-flex items-center gap-[30px]">
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
              Tickets
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
        </ul>
      </div>
      <div className="hidden md:block">
        <Button asChild variant="outline" className="rounded-full px-6 py-2 border-primary text-primary hover:bg-primary/10">
          <Link href="/account">
            Account
          </Link>
        </Button>
      </div>
      <MobileNav open={open} />
    </div>
  );
}
