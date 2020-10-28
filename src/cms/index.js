import React from "react";
import CMS from "netlify-cms-app";
import ReactDOM from "react-dom";
import cloudinary from "netlify-cms-media-library-cloudinary";
import VideoWidget from "./VideoWidget";
import config from "./config";

const AdminConsole = () => {
  React.useEffect(() => {
    CMS.registerMediaLibrary(cloudinary);
    CMS.registerWidget("video", VideoWidget, null, "string");
    CMS.init({ config });
  }, []);

  return <div id="nc-root" />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<AdminConsole />, rootElement);
