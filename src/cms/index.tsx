import React from "react";
import CMS from "netlify-cms-app";
import ReactDOM from "react-dom";
import cloudinary from "netlify-cms-media-library-cloudinary";
import VideoWidget from "./VideoWidget";
import config from "./config";

const AdminConsole = () => {
  React.useEffect(() => {
    CMS.registerMediaLibrary(cloudinary);
    CMS.registerWidget("video", VideoWidget, null);
    CMS.init({ config });
  }, []);

  console.log({
    nodeEnv: process.env.NODE_ENV,
  });

  return <div id="nc-root" />;
};

const rootElement = document.body;
ReactDOM.render(<AdminConsole />, rootElement);
