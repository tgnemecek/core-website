import { Form } from "../types";
import generateHeaders from "./generateHeaders";

type Return = {
  id: string;
  tickets: Form["tickets"];
};

type EventCreate = (form: Form) => Promise<Return>;

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

  const result: Return = await res.json();
  return result;
};

export default eventCreate;
