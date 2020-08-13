import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import Fade from "react-reveal/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import Link from "components/Link";
import logo from "src/img/logo.png";

const Hero = ({ hero: { title, image }, small = false }) => {
  const classes = useStyles({ small })();

  return (
    <section className={classes.hero} id="hero">
      <img
        // srcSet={image.srcSet}
        // sizes={image.sizes}
        // src={image.src}
        src={image}
        className={classes.image}
        alt="Hero Image"
      />
      <div className={classes.logoBarBackground}>
        <Container>
          <Grid container className={classes.logoBar}>
            {!small && (
              <Grid item>
                <Fade left>
                  <img src={logo} className={classes.logo} />
                </Fade>
              </Grid>
            )}
            <Grid item>
              <Fade>
                <Typography variant="h1">{parse(title)}</Typography>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </div>
      {!small && (
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
      )}
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

const useStyles = ({ small }) =>
  makeStyles((theme) => ({
    hero: {
      height: small ? "400px" : "100vh",
      display: "flex",
      alignItems: small ? "flex-start" : "center",
      justifyContent: "center",
      flexDirection: "column",
      backgroundColor: "#00000026",
    },
    logoBarBackground: {
      backgroundColor: "#ffffffd1",
      width: "100%",
    },
    logoBar: {
      justifyContent: small ? "flex-start" : "center",
      alignItems: "center",
    },
    logo: {
      height: 260,
      [theme.breakpoints.down("md")]: {
        height: 200,
      },
      [theme.breakpoints.down("sm")]: {
        height: 180,
      },
      [theme.breakpoints.down("xs")]: {
        height: 130,
      },
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
      maxWidth: "100vw",
      objectFit: "cover",
    },
  }));
