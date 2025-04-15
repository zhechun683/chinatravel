import type { Metadata } from "next";

import { TripPackage } from "@/components/organisms/home/package";
import { Callout } from "@/components/organisms/home/callout";
import { Destinations } from "@/components/organisms/home/destinations";
import { Footer } from "@/components/organisms/footer";
import { Navbar } from "@/components/organisms/navbar";

export const metadata: Metadata = {
  title: "Home | ChinaTravel",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <TripPackage />
        <Destinations />
        <Callout />
      </main>
      <Footer />
    </>
  );
}
