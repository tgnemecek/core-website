import { useEffect } from "react";
import { useLocation } from "@reach/router";
import CMS from "netlify-cms-app";
import { eventCreate, eventUpdate, eventDelete } from "../api";
import { Event, Ticket } from "types";

type EventHandlerProps = { entry: Map<string, any> };

type StoredData = {
  id?: string;
  ticketIds?: string[];
};

// This is needed because the data received from the server can't actually update
// the form, only the saved value. So as soon as you save the form is outdated,
// that means that trying to save again will upload old values.
// With this object we can store data received from the server to make sure its up to date.
const initStoredData: StoredData = {
  id: undefined,
  ticketIds: undefined,
};

let storedData: StoredData = { ...initStoredData };

const useEventsConfig = () => {
  const { href } = useLocation();

  const isEventsCollection = () => {
    return href.includes("/collections/events/");
  };

  const convertFromMap = (map: Map<string, any>) => {
    const form: any = {};
    for (let [key, value] of map.entries()) {
      form[key] = value;
    }
    return form;
  };

  const getForm = (dataEntry: Map<string, any>) => {
    const form = convertFromMap(dataEntry);
    return {
      ...form,
      tickets: Array.from(form.tickets).map((ticket: Map<string, any>) => {
        const obj = convertFromMap(ticket) as Ticket;
        return {
          id: obj.id,
          description: obj.description,
          price: obj.price,
          endsOn: obj.endsOn,
        } as Ticket;
      }),
      language: Array.from(form.language),
    } as Event;
  };

  const ticketsToMap = (tickets: Ticket[], dataEntry: Map<string, any>) => {
    let newTickets = dataEntry.get("tickets");

    tickets.forEach((ticket, i) => {
      newTickets = newTickets.set(i, newTickets.get(i).set("id", ticket.id));
    });
    return newTickets;
  };

  useEffect(() => {
    (CMS as any).registerEventListener({
      name: "preSave",
      handler: async ({ entry }: EventHandlerProps) => {
        if (!isEventsCollection()) return;

        let dataEntry: Map<string, any> = entry.get("data");
        const form = getForm(dataEntry);
        let newData;
        if (!form.id) {
          console.log({ form });

          newData = await eventCreate(form);

          console.log({ newData });
        } else {
          newData = await eventUpdate({
            ...form,
            id: storedData.id || form.id,
            tickets: storedData.ticketIds
              ? form.tickets.map((ticket, i) => {
                  return { ...ticket, id: storedData.ticketIds![i] };
                })
              : form.tickets,
          });
        }
        const { id, tickets } = newData;
        storedData = {
          id,
          ticketIds: tickets.map(({ id }) => id),
        };
        const newTickets = ticketsToMap(tickets, dataEntry);
        dataEntry = dataEntry.set("id", id);
        dataEntry = dataEntry.set("tickets", newTickets);

        console.log({ dataEntry });
        return dataEntry;
      },
    });

    (CMS as any).registerEventListener({
      name: "preUnpublish",
      handler: async ({ entry }: EventHandlerProps) => {
        if (!isEventsCollection()) return;
        try {
          let dataEntry: Map<string, any> = entry.get("data");
          const form = getForm(dataEntry);

          await eventDelete(form);
        } catch (err) {
          return Promise.resolve({
            toJS: () => {
              throw err;
            },
          });
        }
      },
    });
  }, []);

  useEffect(() => {
    storedData = { ...initStoredData };
  }, [href]);
};

export default useEventsConfig;
