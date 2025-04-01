"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/atoms/button";
import { InputNumber } from "@/components/molecules/bookingForm/input-number";
import { Label } from "@/components/atoms/label";
import { VacationItemTypes } from "@/services/types";
import { formatValueToCurrency } from "@/utils/currency";
import { useGlobalContext } from "@/hooks/useGlobalContext";

interface BookingFormProps {
  item: VacationItemTypes;
}

export function BookingForm({ item }: BookingFormProps) {
  const [state, setState] = useState({
    data: {
      amount: 1,
    },
  });
  const [, dispatch] = useGlobalContext();
  const router = useRouter();

  const updateData = (e: { target: { name: string; value: number } }) => {
    setState({
      ...state,
      data: {
        ...state.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  const startBooking = () => {
    const { data } = state;
    dispatch({ type: "CHECKOUT_BOOKING", id: item.id, amount: data.amount });

    router.push("/checkout");
  };

  const { data } = state;

  return (
    <div className="rounded-2xl border-2 border-[#EEE] px-4 py-7">
      <h2 className="text-xl font-semibold text-[#232631]">Start Booking</h2>
      <span className="mt-3.5 inline-block text-base font-normal text-[#7B7B7B]">
        From
      </span>
      <h3 className="mt-2 text-4xl font-semibold text-[#232631]">
        {formatValueToCurrency(item.price)}{" "}
        <span className="font-light text-[#7B7B7B]">per {item.unit}</span>
      </h3>
      <Label
        htmlFor="amount"
        className="mt-[0.625rem] inline-block text-base font-normal text-[#7B7B7B]"
      >
        How many people are going on vacation?
      </Label>
      <InputNumber
        max={20}
        suffix={" person"}
        isSuffixPlural
        name="amount"
        value={data.amount}
        onChange={updateData}
      />
      <p className="mt-5 text-base font-light text-[#7B7B7B]">
        You will pay{" "}
        <span className="font-medium text-[#232631]">
          {formatValueToCurrency(item.price * data.amount)} USD
        </span>{" "}
        for{" "}
        <span className="font-medium text-[#232631]">
          {data.amount} {data.amount > 1 ? "persons" : "person"}
        </span>
      </p>
      <Button
        size="pill"
        className="mt-[2.625rem] w-full text-base"
        onClick={startBooking}
      >
        Book Now
      </Button>
    </div>
  );
}
