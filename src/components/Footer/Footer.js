import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Link from "Link/Link";

const Footer = (props) => {
  const classes = useStyles();

  return <footer className={classes.footer}></footer>;
};

export default Footer;

const useStyles = makeStyles((theme) => ({
  footer: {
    height: 300,
    backgroundColor: theme.palette.grey["400"],
  },
}));
