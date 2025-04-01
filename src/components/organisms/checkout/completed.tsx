import Image from "next/image";

export function Completed() {
  return (
    <div className="container mb-[1.875rem]">
      <div className="row justify-content-center text-center">
        <div>
          <Image
            src="/completed.svg"
            alt="Booking Completed"
            width={362}
            height={330}
            quality={90}
            className="mx-auto mt-[1.875rem]"
          />
          <p className="mx-auto mt-5 max-w-[396px] text-lg font-light text-[#7B7B7B]">
            Your transaction has been submitted. We will notify you via email once the transaction has been confirmed.
          </p>
        </div>
      </div>
    </div>
  );
}
