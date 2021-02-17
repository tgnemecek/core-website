import { FormType } from "../types";
import generateHeaders from "./generateHeaders";

type ReturnType = {
  productId: string;
  meetingId: string;
  tickets: FormType["tickets"];
};

type EventUpdateType = (form: FormType) => Promise<ReturnType>;

const eventUpdate: EventUpdateType = async (form) => {
  const res = await fetch("/.netlify/functions/event-delete", {
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

  if (!result.productId) throw new Error("Couldn't delete product in Stripe");
  if (!result.meetingId) throw new Error("Couldn't delete product in Zoom");
  if (result.tickets.some(({ id }) => !id)) {
    throw new Error("Couldn't delete prices in Stripe");
  }

  return result;
};

export default eventUpdate;
