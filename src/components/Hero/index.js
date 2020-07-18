import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Link from "components/Link";

const Hero = ({ title, image }) => {
  const classes = useStyles()();

  return (
    <section className={classes.hero}>
      <img
        // srcSet={image.srcSet}
        // sizes={image.sizes}
        // src={image.src}
        src={image}
        className={classes.image}
        alt="CORE Logo"
      />
      <div>
        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
};

export default Hero;

const useStyles = () =>
  makeStyles((theme) => ({
    hero: {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      backgroundColor: "#00000026",
    },
    title: {
      color: "white",
      textAlign: "center",
    },
    imageWrapper: {},
    image: {
      position: "absolute",
      zIndex: -1,
      top: 0,
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  }));
