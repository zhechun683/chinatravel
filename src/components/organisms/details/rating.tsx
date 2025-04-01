"use client";

import Image from "next/image";

import { Star } from "@/components/atoms/icons";

export function Rating() {
  return (
    <section className="mt-[7.5rem] bg-[#FAFAFA] py-[4.38rem] pb-[10.25rem]">
      <p className="text-center text-base font-semibold text-secondary">
        满意的顾客
      </p>
      <h3 className="mt-2 text-center text-3xl font-semibold text-[#232631]">
        我们真的很喜欢 Goout
      </h3>
      <div className="mt-[4.38rem] flex flex-wrap items-center justify-center gap-x-[3.13rem] gap-y-10">
        <div className="flex h-[18.375rem] w-[17.9375rem] flex-col rounded-[0.875rem] bg-white p-5">
          <div className="flex items-center gap-x-[0.125rem]">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <p className="mt-5 flex-1 text-base font-normal leading-[1.875rem] text-[#5B5575]">
            我们度过了一段美好的时光，我强烈推荐这个旅行给任何想要探索世界的人。
          </p>
          <div className="flex items-center gap-x-4">
            <figure>
              <Image
                src="/images/emerson.png"
                alt="emerson"
                width={56}
                height={56}
                quality={90}
              />
            </figure>
            <div>
              <h4 className="text-xl font-medium text-[#211B3D]">Emerson</h4>
              <span className="text-base font-normal text-[#5B5575]">
                2023年2月
              </span>
            </div>
          </div>
        </div>
        <div className="flex h-[18.375rem] w-[17.9375rem] flex-col rounded-[0.875rem] bg-white p-5">
          <div className="flex items-center gap-x-[0.125rem]">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <p className="mt-5 flex-1 text-base font-normal leading-[1.875rem] text-[#5B5575]">
            我强烈推荐给任何寻找放松度假的人。
          </p>
          <div className="flex items-center gap-x-4">
            <figure>
              <Image
                src="/images/kaylynn.png"
                alt="kaylynn"
                width={56}
                height={56}
                quality={90}
              />
            </figure>
            <div>
              <h4 className="text-xl font-medium text-[#211B3D]">Kaylynn</h4>
              <span className="text-base font-normal text-[#5B5575]">
                2023年1月
              </span>
            </div>
          </div>
        </div>
        <div className="flex h-[18.375rem] w-[17.9375rem] flex-col rounded-[0.875rem] bg-white p-5">
          <div className="flex items-center gap-x-[0.125rem]">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <p className="mt-5 flex-1 text-base font-normal leading-[1.875rem] text-[#5B5575]">
            旅行是生活中最愉快和最有收获的体验之一。
          </p>
          <div className="flex items-center gap-x-4">
            <figure>
              <Image
                src="/images/abram.png"
                alt="abram"
                width={56}
                height={56}
                quality={90}
              />
            </figure>
            <div>
              <h4 className="text-xl font-medium text-[#211B3D]">Abram</h4>
              <span className="text-base font-normal text-[#5B5575]">
                2022年3月
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
