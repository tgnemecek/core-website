import React from "react";
import parse from "html-react-parser";
import Fade from "react-reveal/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import logo from "src/img/logo.png";
import { Image, SmoothScroll } from "components";
import { Hero } from "types";

type HeroSectionProps = {
  hero: Hero;
  small?: boolean;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  hero: { title, image },
  small = false,
}) => {
  const classes = useStyles({ small })();

  return (
    <section className={classes.hero} id="hero">
      <Image
        className={classes.image}
        src={image}
        width={1920}
        alt="Main illustration of the page"
      />
      <div className={classes.logoBarBackground}>
        <Container>
          <Grid container className={classes.logoBar}>
            {!small && (
              <Grid item>
                <Fade left>
                  <img src={logo} className={classes.logo} alt="CORE Logo" />
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
        <SmoothScroll targetId="posts" className={classes.explore}>
          <Button
            variant="contained"
            component="a"
            color="primary"
            size="large"
          >
            Explore
          </Button>
        </SmoothScroll>
      )}
    </section>
  );
};

export default HeroSection;

type UseStylesProps = {
  small?: boolean;
};

const useStyles = ({ small }: UseStylesProps) =>
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
