import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const baseFontColor = "#595959";
const primaryColor = "#315cb0";

export const themeObject = {
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
      fontSize: "3.2rem",
      fontWeight: 700,
      color: "#535353",
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 400,
      color: baseFontColor,
      borderBottom: `2px solid ${primaryColor}`,
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
      fontSize: "1.2rem",
      color: baseFontColor,
      marginBottom: "2rem",
    },
    subtitle2: {
      fontSize: "1.2rem",
      color: baseFontColor,
      textDecoration: "underline",
    },
  },
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: "#c23535",
    },
    text: {
      primary: baseFontColor,
    },
  },
};

export const theme = responsiveFontSizes(createMuiTheme(themeObject));
