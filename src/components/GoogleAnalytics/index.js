import React from "react";
import ReactGA from "react-ga";

const ID = "UA-178536442-1";

const GoogleAnalytics = () => {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      ReactGA.initialize(ID);
      ReactGA.pageview(window.location.pathname);
    }
  }, []);

  return null;
};

export default GoogleAnalytics;
