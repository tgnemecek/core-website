import React from "react";
import CMS from "netlify-cms-app";
import ReactDOM from "react-dom";
import { Location } from "@reach/router";
import cloudinary from "netlify-cms-media-library-cloudinary";
import VideoWidget from "./VideoWidget";
import CurrentDateWidget from "./CurrentDateWidget";
import config from "./config";
import { ExtendedConfig } from "./types";
import useEventsConfig from "./useEventsConfig";

const AdminConsole: React.FC = () => {
  useEventsConfig();

  React.useEffect(() => {
    CMS.registerMediaLibrary(cloudinary);
    CMS.registerWidget("video", VideoWidget);
    CMS.registerWidget("currentDate", CurrentDateWidget);

    CMS.init({ config: config as ExtendedConfig });
  }, []);

  return <div id="nc-root" />;
};

const rootElement = document.body;
ReactDOM.render(<Location>{() => <AdminConsole />}</Location>, rootElement);
