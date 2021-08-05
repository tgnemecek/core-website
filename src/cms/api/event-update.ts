import { FormType } from "../types";
import generateHeaders from "./generateHeaders";

type ReturnType = {
  id: string;
  tickets: FormType["tickets"];
};

type EventUpdateType = (form: FormType) => Promise<ReturnType>;

const eventUpdate: EventUpdateType = async (form) => {
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

  const result: ReturnType = await res.json();

  if (!result.id) {
    throw new Error("Couldn't update product");
  }

  return result;
};

export default eventUpdate;
