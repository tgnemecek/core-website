import { EventForm, EventServerResponse } from "types";
import generateHeaders from "./generateHeaders";

type EventCreate = (form: EventForm) => Promise<EventServerResponse>;

const eventCreate: EventCreate = async (form) => {
  const res = await fetch("/.netlify/functions/event-create", {
    method: "POST",
    body: JSON.stringify(form),
    headers: generateHeaders(),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(
      "\nFailed to communicate with external services.\nTry again later."
    );
  }

  const result: EventServerResponse = await res.json();

  return result;
};

export default eventCreate;
