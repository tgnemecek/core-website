import { EventForm, EventServerResponse } from "types";
import generateHeaders from "./generateHeaders";

type EventUpdate = (form: EventForm) => Promise<EventServerResponse>;

const eventUpdate: EventUpdate = async (form) => {
  const res = await fetch("/.netlify/functions/event-delete", {
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

export default eventUpdate;
