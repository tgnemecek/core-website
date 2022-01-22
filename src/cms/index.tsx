import React from "react";
import CMS from "netlify-cms-app";
import ReactDOM from "react-dom";
import { Location, LocationProvider } from "@reach/router";
import cloudinary from "netlify-cms-media-library-cloudinary";
import { ExtendedCMSConfig } from "types";
import VideoWidget from "./VideoWidget";
import CurrentDateWidget from "./CurrentDateWidget";
import config from "./config";
import { useEventsConfig } from "./hooks";

const AdminConsole: React.FC = () => {
  useEventsConfig();

  React.useEffect(() => {
    CMS.registerMediaLibrary(cloudinary);
    CMS.registerWidget("video", VideoWidget);
    CMS.registerWidget("currentDate", CurrentDateWidget);

    CMS.init({ config: config as ExtendedCMSConfig });
  }, []);

  return <div id="nc-root" />;
};

const rootElement = document.body;
ReactDOM.render(
  <LocationProvider>
    <Location>{() => <AdminConsole />}</Location>
  </LocationProvider>,
  rootElement
);
