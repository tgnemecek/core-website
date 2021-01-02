import React from "react";
import CMS from "netlify-cms-app";
import jwt from "jsonwebtoken";
import GoTrue from "gotrue-js";
import netlifyIdentity from "netlify-identity-widget";
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
        try {
          console.log("PRE-SAVE");
          let dataEntry = entry.get("data");
          const str = JSON.stringify(dataEntry);
          const { meetingID } = JSON.parse(str);

          const identityToken = await netlifyIdentity.refresh();

          const auth = new GoTrue({
            APIUrl:
              "https://core-website-2020-test.netlify.app/.netlify/identity",
            audience: "",
            setCookie: false,
          });

          const {
            token: { access_token },
          } = auth.currentUser();

          console.log({ access_token });

          if (!meetingID) {
            const res = await fetch("/.netlify/functions/create-new-event", {
              method: "POST",
              body: str,
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
              credentials: "include",
            });
            const data = await res.json();

            dataEntry = dataEntry.set("meetingID", data.meetingID);
            dataEntry = dataEntry.set("calendarID", data.calendarID);
            return dataEntry;
          }
        } catch (err) {
          throw err;
        }
      },
    });

    CMS.init({ config: config as ExtendedConfig });
  }, []);

  return <div id="nc-root" />;
};

const rootElement = document.body;
ReactDOM.render(<AdminConsole />, rootElement);
