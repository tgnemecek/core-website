import React from "react";
import ReactGA from "react-ga";
import { useLocation } from "@reach/router";

const ID = "UA-178536442-1";

const GoogleAnalytics: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      ReactGA.initialize(ID);
      ReactGA.pageview(pathname);
    }
  }, []);

  return null;
};

export default GoogleAnalytics;
