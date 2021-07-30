import { Form } from "../types";
import generateHeaders from "./generateHeaders";

type Return = {
  id: string;
  tickets: Form["tickets"];
};

type EventUpdate = (form: Form) => Promise<Return>;

const eventUpdate: EventUpdate = async (form) => {
  const res = await fetch("/.netlify/functions/event-update", {
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
    throw new Error("Couldn't update product");
  }

  return result;
};

export default eventUpdate;
