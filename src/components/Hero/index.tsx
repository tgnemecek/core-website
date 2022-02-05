import React from "react";
import Fade from "react-reveal/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import { SmoothScroll } from "components";
import { useSettings } from "utils";
import HeroImage from "./HeroImage";
import Logo from "./Logo";

type HeroProps = {
  title?: string;
  image?: string;
  small?: boolean;
  hideTitle?: boolean;
};

const SMALL_HEIGHT = 400;

const Hero: React.FC<HeroProps> = ({
  title,
  image,
  small = false,
  hideTitle,
}) => {
  const classes = useStyles({ small })();

  const { heroImage } = useSettings();

  const brandName = (
    <span>
      CORE
      <br />
      Coaching &amp;
      <br />
      Consulting
    </span>
  );

  return (
    <section className={classes.hero} id="hero">
      <HeroImage
        image={image || heroImage}
        smallHeight={SMALL_HEIGHT}
        small={small}
        className={classes.image}
      />
      <div className={classes.logoBarBackground}>
        <Container>
          <Grid container className={classes.logoBar}>
            {!small && (
              <Grid item>
                <Fade left>
                  <Logo />
                </Fade>
              </Grid>
            )}
            <Grid item>
              {!hideTitle && (
                <Fade>
                  <Typography variant="h1">{title || brandName}</Typography>
                </Fade>
              )}
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

export default Hero;

type UseStylesProps = {
  small?: boolean;
};

const useStyles = ({ small }: UseStylesProps) =>
  makeStyles((theme) => ({
    hero: {
      height: small ? SMALL_HEIGHT : "100vh",
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
      height: small ? SMALL_HEIGHT : "100%",
      width: "100%",
      maxWidth: "100vw",
      objectFit: "cover",
    },
  }));
