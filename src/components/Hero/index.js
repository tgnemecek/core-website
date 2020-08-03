import React from "react";
import PropTypes from "prop-types";
import Fade from "react-reveal/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import Link from "components/Link";
import logo from "src/img/logo.png";

const Hero = ({ hero: { title, image } }) => {
  const classes = useStyles()();

  return (
    <section className={classes.hero} id="hero">
      <img
        // srcSet={image.srcSet}
        // sizes={image.sizes}
        // src={image.src}
        src={image}
        className={classes.image}
        alt="CORE Logo"
      />
      <Grid container className={classes.logoBar}>
        <Grid item>
          <Fade left>
            <img src={logo} className={classes.logo} />
          </Fade>
        </Grid>
        <Grid item>
          <Fade>
            <Typography variant="h1">
              {/* {title} */}
              CORE
              <br />
              Coaching &amp;
              <br />
              Consulting
            </Typography>
          </Fade>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        component="a"
        href="#events"
        color="primary"
        size="large"
        className={classes.explore}
      >
        Explore
      </Button>
    </section>
  );
};

Hero.propTypes = {
  hero: PropTypes.exact({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
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
    logoBar: {
      backgroundColor: "#ffffffd1",
      justifyContent: "center",
      alignItems: "center",
      height: 260,
    },
    logo: {
      height: 260,
    },
    explore: {
      position: "relative",
      top: "20%",
      fontSize: "1rem",
    },
    imageWrapper: {},
    image: {
      position: "fixed",
      zIndex: -1,
      top: 0,
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  }));
