import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import Section from "components/Section";
import Link from "components/Link";

const About = ({ about, image }) => {
  const classes = useStyles();

  return (
    <Section>
      <Container>
        <Typography variant="h2">About</Typography>
        <Grid
          container
          spacing={5}
          justify="space-between"
          className={classes.aboutGrid}
        >
          <Grid item xs={6}>
            <div className={classes.textWrapper}>
              <Fade left>
                <Typography variant="body2">{about}</Typography>
                <div>
                  <Link to="/" className={classes.link}>
                    <Typography variant="body1">Meet the Team</Typography>
                  </Link>
                </div>
              </Fade>
            </div>
          </Grid>
          <Grid item xs={5}>
            <Link to="/">
              <img
                className={classes.image}
                src={image}
                // srcSet={image.srcSet}
                // sizes={image.sizes}
                // src={image.src}
                alt="About"
              />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
};

export default About;

const useStyles = makeStyles((theme) => ({
  aboutGrid: {
    minHeight: 500,
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
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));
