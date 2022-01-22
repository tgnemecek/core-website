import { useEffect } from "react";
import CMS from "netlify-cms-app";
import { eventCreate, eventUpdate, eventDelete } from "../api";
import { useEventsCache } from ".";
import { Event, Ticket, EventServerResponse } from "types";

type EventHandlerProps = { entry: Map<string, any> };

const useEventsConfig = () => {
  const cache = useEventsCache();

  const isEventsCollection = () => {
    // Using window.location because @reach/router is inconsistent
    return window.location.href.includes("/collections/events/");
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

  const addIdsFromCacheToTickets = (tickets: Ticket[]) => {
    return tickets.map((ticket, i) => {
      return { ...ticket, id: cache.current.ticketIds?.[i] };
    });
  };

  useEffect(() => {
    (CMS as any).registerEventListener({
      name: "preSave",
      handler: async ({ entry }: EventHandlerProps) => {
        if (!isEventsCollection()) return;

        let dataEntry: Map<string, any> = entry.get("data");
        const form = getForm(dataEntry);

        let newData: EventServerResponse;
        if (!form.id) {
          newData = await eventCreate(form);
        } else {
          newData = await eventUpdate({
            ...form,
            id: cache.current.id || form.id,
            tickets: cache.current.ticketIds
              ? addIdsFromCacheToTickets(form.tickets)
              : form.tickets,
          });
        }
        const { id, tickets } = newData;
        cache.current = {
          id,
          ticketIds: tickets.map(({ id }) => id),
        };
        const newTickets = ticketsToMap(tickets, dataEntry);
        dataEntry = dataEntry.set("id", id);
        dataEntry = dataEntry.set("tickets", newTickets);
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
};

export default useEventsConfig;
