import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Link from "components/Link";

const About = ({ about, image }) => {
  const classes = useStyles();

  return (
    <section>
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
              <Typography variant="body2">{about}</Typography>
              <Link to="/" className={classes.link}>
                Meet the Team
              </Link>
            </div>
          </Grid>
          <Grid item xs={5}>
            <Link to="/">
              <img
                className={classes.image}
                srcSet={image.srcSet}
                sizes={image.sizes}
                src={image.src}
                alt="Team"
              />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </section>
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
    "&:hover": {
      textDecoration: "underline",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));
