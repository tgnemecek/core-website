import React from "react";
import CMS from "netlify-cms-app";
import ReactDOM from "react-dom";
import cloudinary from "netlify-cms-media-library-cloudinary";
import VideoWidget from "./VideoWidget";
import config from "./config";
import { ExtendedConfig } from "./types";

const AdminConsole = () => {
  React.useEffect(() => {
    CMS.registerMediaLibrary(cloudinary);
    CMS.registerWidget("video", VideoWidget, null);

    (CMS as any).registerEventListener({
      name: "preSave",
      handler: async ({ entry }: any) => {
        const dataEntry = entry.get("data");
        const str = JSON.stringify(dataEntry);
        const { meetingID } = JSON.parse(str);

        if (!meetingID) {
          const res = await fetch("/.netlify/functions/create-new-event", {
            method: "POST",
            body: str,
          });
          const data = await res.json();

          dataEntry.set("meetingID", data.meetingID);
          dataEntry.set("calendarID", data.calendarID);
          return dataEntry;
        }
      },
    });

    CMS.init({ config: config as ExtendedConfig });
  }, []);

  return <div id="nc-root" />;
};

const rootElement = document.body;
ReactDOM.render(<AdminConsole />, rootElement);
