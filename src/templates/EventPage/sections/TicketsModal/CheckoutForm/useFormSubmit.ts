import React from "react";
import moment from "moment-timezone";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { verifyEmail } from "utils";
import { Ticket, API } from "types";
import EventContext from "../../../EventContext";

import type { FormState, FormErrors } from "./types";

type HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => Promise<void>;

type UseFormSubmit = (props: {
  formState: FormState;
  setFormErrors: (errors: FormErrors) => void;
  hiddenCardError?: string;
  clientSecret: string;
  ticket: Ticket;
  goToFailed: () => void;
  goToSuccess: () => void;
}) => HandleSubmit;

const useFormSubmit: UseFormSubmit = ({
  formState,
  setFormErrors,
  hiddenCardError,
  clientSecret,
  ticket,
  goToFailed,
  goToSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const { setAlreadyPurchased, setLoading, event } =
    React.useContext(EventContext)!;

  const hasErrors = () => {
    const newErrors: Partial<FormErrors> = (
      Object.keys(formState) as (keyof FormState)[]
    )
      .filter((key) => !formState[key])
      .reduce((acc, key) => {
        return { ...acc, [key]: "This is a required field" };
      }, {});

    if (!newErrors.email && !verifyEmail(formState.email)) {
      newErrors.email = "The provided email address is invalid.";
    }

    if (hiddenCardError) {
      newErrors.card = hiddenCardError;
    }

    setFormErrors({
      ...newErrors,
      card: newErrors.card || "",
    });

    return Object.values(newErrors).some(Boolean);
  };

  const submitViaStripe = async () => {
    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!,
        billing_details: {
          email: formState.email,
          name: `${formState.firstName}_${formState.lastName}`,
        },
      },
    });

    if (payload.error) throw payload.error;
  };

  const submitForFreeTicket = async () => {
    const body: API.EventRegisterFreeBody = {
      eventId: event.id,
      ticketId: ticket.id,
      timezone: moment.tz.guess(),
      firstName: formState.firstName,
      lastName: formState.lastName,
      email: formState.email,
    };

    const res = await fetch("/.netlify/functions/event-register-free", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Server Error");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasErrors()) return;

    setLoading(true);

    const submit = ticket.price ? submitViaStripe : submitForFreeTicket;

    try {
      await submit();
      setAlreadyPurchased(true);
      goToSuccess();
    } catch (err) {
      console.error(err);
      goToFailed();
    } finally {
      setLoading(false);
    }
  };

  return handleSubmit;
};

export default useFormSubmit;
