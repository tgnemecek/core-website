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
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }

  const result: Return = await res.json();

  if (!result.id) {
    throw new Error("Couldn't create product");
  }

  return result;
};

export default eventCreate;
