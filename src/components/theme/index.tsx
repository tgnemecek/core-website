import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { breakpoints } from "utils";

const baseFontColor = "#595959";
const primaryColor = "#315cb0";

const themeObject = {
  breakpoints,
  overrides: {
    MuiFilledInput: {
      root: {
        backgroundColor: "#f5f3f369",
        "&&:hover": {
          backgroundColor: "#f5f3f369",
        },
        "&.Mui-focused": {
          backgroundColor: "#f5f3f3cc",
        },
      },
    },
  },
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

const theme = responsiveFontSizes(createMuiTheme(themeObject));

export default theme;
