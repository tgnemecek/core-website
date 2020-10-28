import React from "react";
import CMS from "netlify-cms-app";
import ReactDOM from "react-dom";
import cloudinary from "netlify-cms-media-library-cloudinary";
import VideoWidget from "./VideoWidget";
import config from "./config";

CMS.registerMediaLibrary(cloudinary);
CMS.registerWidget("video", VideoWidget, null, "string");

const AdminConsole = () => {
  React.useEffect(() => {
    CMS.init({ config });
  }, []);

  return <div id="nc-root" />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<AdminConsole />, rootElement);
