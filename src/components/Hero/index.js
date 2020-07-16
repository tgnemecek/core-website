import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Link from "components/Link";

const Hero = ({ title, titleColor, image }) => {
  const classes = useStyles({ titleColor })();

  return (
    <section className={classes.hero}>
      <img
        srcSet={image.srcSet}
        sizes={image.sizes}
        src={image.src}
        className={classes.image}
        alt="CORE Logo"
      />
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  invertTitleColor: PropTypes.bool.isRequired,
};

export default Hero;

const useStyles = ({ titleColor }) =>
  makeStyles((theme) => ({
    hero: {
      height: 500,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    title: {
      color: titleColor,
      textAlign: "center",
    },
    imageWrapper: {},
    image: {
      position: "absolute",
      zIndex: -1,
      top: 0,
      height: 500,
      width: "100%",
      objectFit: "cover",
    },
  }));
