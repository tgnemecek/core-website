import React from "react";
import ReactGA from "react-ga";
import { useLocation } from "@reach/router";

const { GATSBY_GA_TRACKING_ID } = process.env;

const GoogleAnalytics: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    console.log({ GATSBY_GA_TRACKING_ID });
    if (typeof window !== "undefined" && GATSBY_GA_TRACKING_ID) {
      ReactGA.initialize(GATSBY_GA_TRACKING_ID);
      ReactGA.pageview(pathname);
    }
  }, []);

  return null;
};

export default GoogleAnalytics;
