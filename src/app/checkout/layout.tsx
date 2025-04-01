import Link from "next/link";
import type { Metadata } from "next";

import { Logo } from "@/components/atoms/logo";

export const metadata: Metadata = {
  title: "Checkout | ChinaTravel",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex h-20 items-center justify-center border-b border-[#EEE]">
        <Link href="/">
          <Logo isDisplayMobile />
        </Link>
      </header>
      {children}
    </>
  );
}
