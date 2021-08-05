import { FormType } from "../types";
import generateHeaders from "./generateHeaders";

type ReturnType = {
  id: string;
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

  return result;
};

export default eventUpdate;
