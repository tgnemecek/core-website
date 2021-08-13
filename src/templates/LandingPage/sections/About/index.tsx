import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { Section, Link } from "components";
// import { Link } from "gatsby";
import streak from "src/img/streak1.jpg";
import { AboutType } from "types";

type AboutProps = {
  about: AboutType;
};

const About: React.FC<AboutProps> = ({ about: { text, image } }) => {
  const classes = useStyles();

  return (
<<<<<<< HEAD:src/templates/LandingPage/sections/AboutSection/index.tsx
    <Section className={classes.section}>
      <Typography variant="srOnly" component="h2">
        AboutSection
      </Typography>
      <div className={classes.gridWrapper}>
        <Container className={classes.aboutGrid}>
          <div className={classes.textWrapper}>
            <Fade left>
              <Typography variant="body2" className={classes.text}>
                {text}
              </Typography>
              <div>
                <Link to="/team">Meet the Team</Link>
              </div>
            </Fade>
          </div>
          <div>
=======
    <Section className={classes.about}>
      <Container>
        <Typography variant="srOnly" component="h2">
          About
        </Typography>
        <Grid
          container
          spacing={5}
          justify="center"
          className={classes.aboutGrid}
        >
          <Grid item xs={12} md={6} className={classes.leftSide}>
            <img src={streak} className={classes.streak} alt="Streak" />
            <div className={classes.textWrapper}>
              <Fade left>
                <Typography variant="body2">{text}</Typography>
                <div>
                  <Link to="/team" className={classes.link}>
                    <Typography variant="body1">Meet the Team</Typography>
                  </Link>
                </div>
              </Fade>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.imgWrapper}>
>>>>>>> @{-1}:src/templates/LandingPage/sections/About/index.tsx
            <img className={classes.image} src={image} alt="CORE Logo" />
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default About;

const useStyles = makeStyles((theme) => ({
  section: {
    background:
      "linear-gradient(90deg, #b9c9ea 0%, #b9c9ea 20%, rgba(255,255,255,0) 60%)",
  },
  gridWrapper: {
    position: "relative",
  },
  aboutGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textWrapper: {
    maxWidth: 650,
    padding: "25px 0",
    margin: "auto",
    zIndex: 1,
  },
  text: {
    fontSize: 20,
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
  link: {
    "& p": {
      display: "inline",
      textDecoration: "underline",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    maxWidth: 400,
    maxHeight: 400,
    minHeight: 250,
    minWidth: 250,
    objectFit: "contain",
  },
}));
