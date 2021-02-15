import { FormType } from "../types";
import generateHeaders from "./generateHeaders";

type ReturnType = {
  productId: string;
  meetingId: string;
  tickets: FormType["tickets"];
};

type EventCreateType = (form: FormType) => Promise<ReturnType>;

const eventCreate: EventCreateType = async (form) => {
  const res = await fetch("/.netlify/functions/event-create", {
    method: "POST",
    body: JSON.stringify(form),
    headers: generateHeaders(),
    credentials: "include",
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }

  const result: ReturnType = await res.json();

  if (!result.productId) throw new Error("Couldn't create product in Stripe");
  if (!result.meetingId) throw new Error("Couldn't create product in Zoom");
  if (result.tickets.some(({ id }) => !id)) {
    throw new Error("Couldn't create prices in Stripe");
  }

  return result;
};

export default eventCreate;
