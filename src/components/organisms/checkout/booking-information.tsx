import Image from "next/image";

import { Separator } from "@/components/atoms/separator";
import { Label } from "@/components/atoms/label";
import { Input } from "@/components/atoms/input";
import { FormData } from "@/types";
import { VacationItemTypes } from "@/services/types";
import { formatValueToCurrency } from "@/utils/currency";

interface BookingInformationProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  data: FormData;
  itemDetails: VacationItemTypes | null;
  checkout: {
    id: string;
    amount: number;
  };
  isLoading?: boolean;
}

export function BookingInformation({
  data,
  itemDetails,
  checkout,
  onChange,
  isLoading,
}: BookingInformationProps) {
  return (
    <section className="container">
      <div className="flex flex-wrap justify-center gap-x-20 lg:justify-start xl:pl-[116px]">
        <div className="mt-10 w-full max-w-[420px] lg:mt-20">
          <figure className="relative h-[270px] w-full overflow-hidden rounded-2xl md:w-[420px]">
            {itemDetails?.image ? (
              <Image
                src={itemDetails.image.startsWith('/') ? itemDetails.image : `/${itemDetails.image}`}
                alt={itemDetails.title || "Travel Package"}
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Image
                src="/images/1.png"
                alt="Travel Package"
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            )}
          </figure>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-y-2">
            {itemDetails ? (
              <>
                <div className="w-full">
                  <h3
                    className="truncate text-xl font-normal text-[#232631]"
                    title={itemDetails?.title}
                  >
                    {itemDetails?.title}
                  </h3>
                  <span className="text-base font-light text-[#7B7B7B]">
                    {itemDetails?.city}, {itemDetails?.country}
                  </span>
                </div>
                <div className="text-base font-medium text-[#232631]">
                  {formatValueToCurrency(checkout.amount * itemDetails?.price)}{" "}
                  USD <span className="font-light text-[#7B7B7B]">per</span>{" "}
                  {checkout.amount}{" "}
                  {checkout.amount > 1
                    ? `${itemDetails?.unit}s`
                    : itemDetails?.unit}
                </div>
              </>
            ) : (
              <>
                <div className="mb-1 h-8 w-9/12 animate-pulse rounded-lg bg-gray-200"></div>
                <div className="h-8 w-1/2 animate-pulse rounded-lg bg-gray-200"></div>
              </>
            )}
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="mt-[3.125rem] hidden h-[432px] lg:block"
        />
        <div className="mt-10 w-full space-y-4 lg:mt-20 lg:max-w-[322px]">
          {isLoading ? (
            <div className="flex h-60 w-full items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
            </div>
          ) : (
            <>
              <div>
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  type="text"
                  value={data.firstName}
                  id="firstname"
                  name="firstName"
                  placeholder="Please enter your first name..."
                  className="mt-2"
                  onChange={onChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  value={data.lastName}
                  id="lastName"
                  name="lastName"
                  placeholder="Please enter your last name..."
                  className="mt-2"
                  onChange={onChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  value={data.email}
                  id="email"
                  name="email"
                  placeholder="Please enter your email address..."
                  className="mt-2"
                  onChange={onChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  value={data.phone}
                  id="phone"
                  name="phone"
                  placeholder="Please enter your phone number..."
                  className="mt-2"
                  onChange={onChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
