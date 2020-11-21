import React from "react";
import { Helmet } from "react-helmet";

import "./reset.css";
import "fontsource-roboto";

import { GoogleAnalytics, theme } from "components";

import { MuiThemeProvider } from "@material-ui/core";

import { useSiteMetadata } from "utils";
import { withPrefix } from "gatsby";

const Layout: React.FC = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta property="og:image" content={`${withPrefix("/")}img/logo.png`} />
      </Helmet>
      <GoogleAnalytics />
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </div>
  );
};

export default Layout;
