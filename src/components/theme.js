import { createMuiTheme } from "@material-ui/core";

const baseFontColor = "#595959";

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
  overrides: {},
  typography: {
    fontFamily: '"Roboto", Arial, sans-serif',
    fontSize: 12,
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      color: baseFontColor,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      marginBottom: "2rem",
      marginTop: "2rem",
      color: baseFontColor,
    },
    h3: {
      fontSize: "1.5rem",
      marginBottom: "1rem",
      color: baseFontColor,
    },
    body1: {
      fontSize: "1.2rem",
      color: baseFontColor,
    },
    body2: {
      fontSize: "1.5rem",
      color: baseFontColor,
    },
    subtitle1: {
      color: baseFontColor,
    },
    subtitle2: {
      fontSize: "1.2rem",
      color: baseFontColor,
      textDecoration: "underline",
    },
  },
  palette: {
    primary: {
      main: "#19c7f7", // Blue
    },
    secondary: {
      main: "#FF5D5D", // Pink
    },
    text: {
      primary: baseFontColor,
    },
  },
};

export const theme = createMuiTheme(themeObject);
