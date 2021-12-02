import { Form } from "../types";
import generateHeaders from "./generateHeaders";

type Return = {
  id: string;
  tickets: Form["tickets"];
};

type EventUpdate = (form: Form) => Promise<Return>;

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

  const result: Return = await res.json();
  return result;
};

export default eventUpdate;
