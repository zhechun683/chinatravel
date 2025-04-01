"use client";

import { ChangeEvent, useState, useEffect, useCallback } from "react";
import Link from "next/link";

import {
  Stepper,
  Controller,
  MainContent,
  Meta,
  Numbering,
} from "@/components/molecules/stepper";
import { BookingInformation } from "@/components/organisms/checkout/booking-information";
import { Completed } from "@/components/organisms/checkout/completed";
import { Payment } from "@/components/organisms/checkout/payment";
import { Button } from "@/components/atoms/button";
import { KeyofStep, Steps } from "@/types";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { VacationItemTypes } from "@/services/types";
import { getVacationDetails } from "@/services/vacation";
import { setNewBooking } from "@/services/booking";
import { getUserProfile } from "@/services/user";

export default function CheckoutPage() {
  const [state, setState] = useState({
    data: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      cardNumber: "",
      cardName: "",
      cvc: "",
    },
  });
  const [item, setItem] = useState<VacationItemTypes | null>(null);
  const [checkout, dispatch] = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);

  // Get travel item details
  const getItem = useCallback(async (id: string) => {
    const data = await getVacationDetails(id);
    setItem(data);
  }, []);

  // Load user profile
  const loadUserProfile = useCallback(async () => {
    try {
      // Get current user profile
      const userProfile = await getUserProfile();
      if (userProfile) {
        // Auto-fill user information to form
        setState(prevState => ({
          data: {
            ...prevState.data,
            firstName: userProfile.first_name || "",
            lastName: userProfile.last_name || "",
            email: userProfile.email || "",
            phone: userProfile.phone_number?.toString() || "",
          }
        }));
      }
    } catch (error) {
      console.error("Failed to load user profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize data
  useEffect(() => {
    getItem(checkout.id);
    loadUserProfile(); // Load user profile
  }, [checkout.id, getItem, loadUserProfile]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      data: {
        ...data,
        [event.target.name]: event.target.value,
      },
    });
  };

  const { data } = state;

  async function submitHandler(nextStep: () => void) {
    console.log("Submitting payment data:", {
      amount: checkout.amount,
      card_holder_name: data.cardName,
      card_number: data.cardNumber,
      cvc: data.cvc,
      email: data.email,
      first_name: data.firstName,
      item_id: checkout.id,
      last_name: data.lastName,
      phone_number: data.phone,
    });
    
    try {
      const newBooking = await setNewBooking({
        amount: checkout.amount,
        card_holder_name: data.cardName,
        card_number: Number(data.cardNumber),
        cvc: Number(data.cvc),
        email: data.email,
        first_name: data.firstName,
        item_id: checkout.id,
        last_name: data.lastName,
        phone_number: Number(data.phone),
      });
      
      console.log("Booking created successfully, ID:", newBooking);
      nextStep();
    } catch (error) {
      console.error("Error occurred during payment process:", error);
      alert("Error occurred during payment process, please check console for details.");
    }
  }

  const steps = {
    bookingInformation: {
      title: "Booking Information",
      description: "Please fill in the form below",
      content: (
        <BookingInformation
          data={data}
          itemDetails={item}
          checkout={checkout}
          onChange={onChange}
          isLoading={isLoading}
        />
      ),
    },
    payment: {
      title: "Payment",
      description: "Please follow the instructions below",
      content: (
        <Payment
          data={data}
          itemDetails={item}
          checkout={checkout}
          onChange={onChange}
        />
      ),
    },
    completed: {
      title: "Booking Complete",
      description: null,
      content: <Completed />,
    },
  };

  return (
    <Stepper steps={steps}>
      {(
        prevStep: () => string,
        nextStep: () => string,
        CurrentStep: KeyofStep,
        steps: Steps,
      ) => (
        <>
          <Numbering
            data={steps}
            current={CurrentStep}
            className="mt-[4.375rem]"
          />
          <Meta data={steps} current={CurrentStep} />
          <MainContent data={steps} current={CurrentStep} />

          {CurrentStep === "bookingInformation" && (
            <Controller>
              {data.firstName !== "" &&
                data.lastName !== "" &&
                data.email !== "" &&
                data.phone !== "" && (
                  <Button className="w-[300px] text-base font-medium bg-secondary text-white hover:bg-secondary/90" onClick={nextStep}>
                    Continue to Book
                  </Button>
                )}
              <Button asChild variant="ghost" className="w-[300px] text-base">
                <Link href={`/vacation/${checkout.id}`}>Cancel</Link>
              </Button>
            </Controller>
          )}

          {CurrentStep === "payment" && (
            <Controller>
              {data.cardNumber !== "" &&
                data.cardName !== "" &&
                data.cvc !== "" && (
                  <Button
                    className="w-[300px] text-base font-medium bg-secondary text-white hover:bg-secondary/90"
                    onClick={() => submitHandler(nextStep)}
                  >
                    Confirm Payment
                  </Button>
                )}
              <Button
                variant="ghost"
                className="w-[300px] text-base"
                onClick={prevStep}
              >
                Cancel
              </Button>
            </Controller>
          )}

          {CurrentStep === "completed" && (
            <Controller>
              <Button asChild className="font-medium bg-secondary text-white hover:bg-secondary/90">
                <Link href="/">Back to Home</Link>
              </Button>
            </Controller>
          )}
        </>
      )}
    </Stepper>
  );
}
