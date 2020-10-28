import React from "react";
import CMS from "netlify-cms-app";
import ReactDOM from "react-dom";
import config from "./config.json";

CMS.registerMediaLibrary(cloudinary);
CMS.registerWidget("video", VideoWidget, Preview, "string");

const AdminConsole = () => {
  React.useEffect(() => {
    CMS.init({ config });
  }, []);

  return <div id="nc-root" />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<AdminConsole />, rootElement);
