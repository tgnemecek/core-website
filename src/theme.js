import { createMuiTheme } from "@material-ui/core";

const themeObject = {
  breakpoints: {
    values: {
      xs: 400,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  // Use the overrides to set defaults
  overrides: {},
  typography: {
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    fontSize: 12,
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      marginBottom: "2rem",
    },
    h3: {
      fontSize: "1.5rem",
    },
    body2: {
      fontSize: "1.5rem",
    },
  },
  palette: {
    primary: {
      main: "#19c7f7", // Blue
    },
    secondary: {
      main: "#FF5D5D", // Pink
    },
  },
};

export const theme = createMuiTheme(themeObject);
