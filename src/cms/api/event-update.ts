import { Form, ServerResponse } from "../types";
import generateHeaders from "./generateHeaders";

type EventUpdate = (form: Form) => Promise<ServerResponse>;

const eventUpdate: EventUpdate = async (form) => {
  const res = await fetch("/.netlify/functions/event-update", {
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

  const result: ServerResponse = await res.json();
  return result;
};

export default eventUpdate;
