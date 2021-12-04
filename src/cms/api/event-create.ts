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

  console.log({ res });

  if (!res.ok) {
    throw new Error(
      "\nFailed to communicate with external services.\nTry again later."
    );
  }

  const result: Return = await res.json();

  console.log({ result });

  throw new Error("Safety error");

  return result;
};

export default eventCreate;
