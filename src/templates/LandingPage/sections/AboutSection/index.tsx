import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { Section } from "components";
import { Link } from "gatsby";
import streak from "src/img/streak1.jpg";
import { About } from "types";

type AboutSectionProps = {
  about: About;
};

const AboutSection: React.FC<AboutSectionProps> = ({
  about: { text, image },
}) => {
  const classes = useStyles();

  return (
    <Section className={classes.about}>
      <Container>
        <Typography variant="srOnly" component="h2">
          AboutSection
        </Typography>
        <Grid
          container
          spacing={5}
          justifyContent="center"
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
            <img className={classes.image} src={image} alt="CORE Logo" />
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
};

export default AboutSection;

const useStyles = makeStyles((theme) => ({
  about: {
    position: "relative",
  },
  aboutGrid: {
    minHeight: 500,
    "& > div": {
      zIndex: 1,
    },
  },
  streak: {
    position: "absolute",
    left: "-2vw",
    height: "calc(100% - 220px)",
    width: "54vw",
    top: "110px",
  },
  [theme.breakpoints.down("sm")]: {
    leftSide: {
      position: "relative",
    },
    streak: {
      width: "110vw",
      minWidth: 700,
      height: "110%",
      top: "-5%",
    },
  },
  textWrapper: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  link: {
    "& p": {
      display: "inline",
      textDecoration: "underline",
    },
  },
  imgWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
