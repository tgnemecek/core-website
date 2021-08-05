import { FormType } from "../types";
import generateHeaders from "./generateHeaders";

type ReturnType = {
  id: string;
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

  if (!result.id) {
    throw new Error("Couldn't create product");
  }

  return result;
};

export default eventCreate;
