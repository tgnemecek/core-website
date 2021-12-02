import axios from "axios";
import { Form } from "../types";
import generateHeaders from "./generateHeaders";

type Return = {
  id: string;
  tickets: Form["tickets"];
};

type EventUpdate = (form: Form) => Promise<Return>;

// /.netlify/functions/event-update
// "http://localhost:8888/.netlify/functions/event-update",

const eventUpdate: EventUpdate = async (form) => {
  try {
    const res = await fetch("/.netlify/functions/event-update", {
      method: "POST",
      body: JSON.stringify(form),
      headers: generateHeaders(),
      credentials: "include",
    });

    console.log("here1111 ------");

    const data = await res.text();

    console.log(res);

    console.log(data);
    // return res.data;
  } catch (err) {
    console.log("here ------");
    console.log(err);
    // throw err;
  }
  throw new Error("no-error");
  // try {
  //   const res = await fetch("/.netlify/functions/event-update", {
  //     method: "POST",
  //     body: JSON.stringify(form),
  //     headers: generateHeaders(),
  //     credentials: "include",
  //   });

  //   if (!res.ok) {
  //     const errorMessage = await res.text();
  //     throw new Error(errorMessage);
  //   }

  //   const result: Return = await res.json();

  //   if (!result.id) {
  //     throw new Error("Couldn't update product");
  //   }
  //   return result;
  // } catch (err) {
  //   console.log(err.response.data.error);
  //   throw err;
  // }
};

export default eventUpdate;
