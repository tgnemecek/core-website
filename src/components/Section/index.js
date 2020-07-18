import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const _ = require("lodash");

const Section = ({
  children,
  backgroundColor = "common.white",
  small = false,
}) => {
  const classes = useStyles({ backgroundColor, small })();

  return <section className={classes.section}>{children}</section>;
};

export default Section;

const useStyles = ({ backgroundColor, small }) =>
  makeStyles((theme) => ({
    section: {
      boxShadow: "inset 0px -10px 12px -3px rgba(0, 0, 0, 0.1)",
      padding: small ? "40px 0" : "120px 0",
      backgroundColor: _.get(theme, `palette.${backgroundColor}`),
    },
  }));
