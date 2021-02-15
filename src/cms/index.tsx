import React from "react";
import CMS from "netlify-cms-app";
import { CmsEventListener } from "netlify-cms-core";
import jwt from "jsonwebtoken";
import GoTrue from "gotrue-js";
import netlifyIdentity from "netlify-identity-widget";
import ReactDOM from "react-dom";
import cloudinary from "netlify-cms-media-library-cloudinary";
import VideoWidget from "./VideoWidget";
import config from "./config";
import { ExtendedConfig } from "./types";
import { eventCreate, eventUpdate } from "./api";
import { EventType } from "types";

type EventHandlerProps = CmsEventListener["handler"];

const AdminConsole = () => {
  React.useEffect(() => {
    CMS.registerMediaLibrary(cloudinary);
    CMS.registerWidget("video", VideoWidget, null);

    (CMS as any).registerEventListener({
      name: "preSave",
      handler: async ({ entry }: EventHandlerProps) => {
        try {
          let dataEntry: Map<string, any> = entry.get("data");
          const form = Object.fromEntries(dataEntry) as EventType;

          let newData;

          if (!form.productId) {
            newData = await eventCreate(form);
          } else {
            newData = await eventCreate(form);
            // newData = await eventUpdate(form);
          }

          const { productId, meetingId, tickets } = newData;

          throw new Error("dont save");

          dataEntry = dataEntry.set("productId", productId);
          dataEntry = dataEntry.set("meetingId", meetingId);
          dataEntry = dataEntry.set("tickets", tickets);
          return dataEntry;
        } catch (err) {
          return Promise.resolve({
            toJS: () => {
              throw err;
            },
          });
        }
      },
    });

    CMS.init({ config: config as ExtendedConfig });
  }, []);

  return <div id="nc-root" />;
};

const rootElement = document.body;
ReactDOM.render(<AdminConsole />, rootElement);
