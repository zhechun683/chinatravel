import Image from "next/image";
import { Search } from "lucide-react";

import { Separator } from "@/components/atoms/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/molecules/tabs";
import { MapPin, Calendar, LocateFixed, Seat } from "@/components/atoms/icons";
import { Button } from "@/components/atoms/button";

export function Hero() {
  return (
    <section className="mt-[1.88rem] lg:container">
      <div className="bg-[#FAFAFA] px-4 py-10 lg:rounded-3xl xl:relative xl:p-0">
        <div className="flex flex-wrap justify-between gap-y-4">
          <div className="xl:py-[4.5rem] xl:pl-[3.75rem]">
            <h1 className="max-w-[31.8125rem] text-3xl font-bold text-[#232631] md:text-4xl xl:text-[3rem] xl:leading-[1.2]">
              Explore Any Destination<br />
              Across China<br />
            </h1>
            <p className="mt-8 max-w-[24.3125rem] text-base font-normal leading-[1.875rem] text-[#7B7B7B]">
              A relaxing and enjoyable trip in China.<br />
              Click the button below to learn more!
            </p>
          </div>
          <figure>
            <Image
              src="/images/hero.png"
              alt="homestay"
              priority
              width={600}
              height={580}
              quality={90}
              className="rounded-3xl"
            />
          </figure>
        </div>
        <Tabs
          defaultValue="flight"
          className="mt-8 w-full max-w-[72.5rem] xl:absolute xl:bottom-10 xl:left-10"
        >
          <TabsList>
            <TabsTrigger value="flight" className="rounded-tl-xl">
              Tickets
            </TabsTrigger>
            <TabsTrigger value="hotel" className="rounded-tr-xl" disabled>
              Itinerary
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="flight"
            className="flex flex-col gap-y-10 xl:flex-row xl:items-center xl:justify-between"
          >
            <div className="flex flex-wrap items-center gap-x-[1.87rem] gap-y-5 xl:h-[3.1875rem]">
              <div className="flex w-full items-center xl:max-w-max">
                <MapPin className="mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-[#232631]">
                    Beijing, China
                  </h3>
                  <p className="text-base font-normal text-[#848484]">
                    Select Location
                  </p>
                </div>
                <LocateFixed className="ml-auto xl:ml-5" />
              </div>
              <Separator orientation="vertical" className="hidden xl:block" />
              <Separator orientation="horizontal" className="xl:hidden" />
              <div className="flex w-full items-center xl:max-w-max">
                <Calendar className="mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-[#232631]">
                    12 Feb 2025
                  </h3>
                  <p className="text-base font-normal text-[#848484]">
                    Choose Date
                  </p>
                </div>
                <LocateFixed className="ml-auto xl:ml-5" />
              </div>
              <Separator orientation="vertical" className="hidden xl:block" />
              <Separator orientation="horizontal" className="xl:hidden" />
              <div className="flex w-full items-center xl:max-w-max">
                <Seat className="mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-[#232631]">
                    Self-driving
                  </h3>
                  <p className="text-base font-normal text-[#848484]">
                    Choose Tour Type
                  </p>
                </div>
                <LocateFixed className="ml-auto xl:ml-5" />
              </div>
            </div>
            <Button className="flex items-center gap-x-[10px] text-lg">
              <Search className="text-white" />
              Search Itinerary
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
