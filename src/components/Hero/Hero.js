import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Link from "components/Link/Link";

const Hero = (props) => {
  const classes = useStyles();

  return (
    <section className={classes.hero}>
      <img src="" alt="CORE Logo" />
      <Typography variant="h1">CORE Coaching &amp; Consulting</Typography>
    </section>
  );
};

export default Hero;

const useStyles = makeStyles((theme) => ({
  hero: {
    height: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}));
