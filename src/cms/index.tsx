import React from "react";
import CMS from "netlify-cms-app";
import { CmsEventListener } from "netlify-cms-core";
import ReactDOM from "react-dom";
import { Location } from "@reach/router";
import cloudinary from "netlify-cms-media-library-cloudinary";
import VideoWidget from "./VideoWidget";
import CurrentDateWidget from "./CurrentDateWidget";
import config from "./config";
import { ExtendedConfig } from "./types";
<<<<<<< HEAD
import useEventsConfig from "./useEventsConfig";

const AdminConsole: React.FC = () => {
  useEventsConfig();

  React.useEffect(() => {
    CMS.registerMediaLibrary(cloudinary);
    CMS.registerWidget("video", VideoWidget);
    CMS.registerWidget("currentDate", CurrentDateWidget);
=======
import { eventCreate, eventUpdate, eventDelete } from "./api";
import { EventType, TicketType } from "types";

type EventHandlerProps = CmsEventListener["handler"];

type StoredDataType = {
  id: string;
  ticketIds: string[];
};

const convertFromMap = (dataEntry: Map<string, any>) => {
  const form = Object.fromEntries(dataEntry);
  return {
    ...form,
    tickets: Array.from(form.tickets).map((ticket: Map<string, any>) => {
      const obj = Object.fromEntries(ticket) as TicketType;
      return {
        id: obj.id,
        description: obj.description,
        price: obj.price,
        endsOn: obj.endsOn,
        extra: obj.extra,
      } as TicketType;
    }),
    language: Array.from(form.language),
  } as EventType;
};

const ticketsToMap = (tickets: TicketType[], dataEntry: Map<string, any>) => {
  let newTickets = dataEntry.get("tickets");

  tickets.forEach((ticket, i) => {
    newTickets = newTickets.set(i, newTickets.get(i).set("id", ticket.id));
  });
  return newTickets;
};

// This is needed because the data received from the server can't actually update
// the form, only the saved value. So as soon as you save the form is outdated,
// that means that trying to save again will upload old values.
// With this object we can store data received from the server to make sure its up to date.
const initStoredData: StoredDataType = {
  id: undefined,
  ticketIds: undefined,
};

let storedData: StoredDataType = { ...initStoredData };

const AdminConsole = () => {
  const isEventsCollection = () => {
    const { href } = window.location;
    return href.includes("/collections/events/");
  };

  React.useEffect(() => {
    CMS.registerMediaLibrary(cloudinary);
    CMS.registerWidget("video", VideoWidget, null);

    (CMS as any).registerEventListener({
      name: "preSave",
      handler: async ({ entry }: EventHandlerProps) => {
        if (!isEventsCollection()) return;

        try {
          let dataEntry: Map<string, any> = entry.get("data");
          const form = convertFromMap(dataEntry);

          let newData;

          if (!form.id) {
            newData = await eventCreate(form);
          } else {
            newData = await eventUpdate({
              ...form,
              id: storedData.id || form.id,
              tickets: storedData.ticketIds
                ? form.tickets.map((ticket, i) => {
                    return { ...ticket, id: storedData.ticketIds[i] };
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
          return dataEntry;
        } catch (err) {
          // This is the only way to show the user an error and prevent the form from saving
          return Promise.resolve({
            toJS: () => {
              throw err;
            },
          });
        }
      },
    });

    (CMS as any).registerEventListener({
      name: "preUnpublish",
      handler: async ({ entry }: EventHandlerProps) => {
        if (!isEventsCollection()) return;
        try {
          let dataEntry: Map<string, any> = entry.get("data");
          const form = convertFromMap(dataEntry);

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
>>>>>>> @{-1}

    CMS.init({ config: config as ExtendedConfig });
  }, []);

  return <div id="nc-root" />;
};

const rootElement = document.body;
ReactDOM.render(<Location>{() => <AdminConsole />}</Location>, rootElement);
