import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Link from "components/Link/Link";

const About = (props) => {
  const classes = useStyles();

  return (
    <section className={classes.about}>
      <Container>
        <Typography variant="h2">About</Typography>
        <Grid container spacing={5} justify="space-between">
          <Grid item xs={6}>
            <div className={classes.textWrapper}>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                dicta minus molestiae vel beatae natus eveniet ratione
                temporibus aperiam harum alias officiis assumenda officia
                quibusdam deleniti eos cupiditate dolore doloribus.
              </Typography>
              <Link to="/" className={classes.link}>
                Meet the Team
              </Link>
            </div>
          </Grid>
          <Grid item xs={5}>
            <Link to="/">
              <img
                className={classes.image}
                src="https://i2.wp.com/thebestbrainpossible.com/wp-content/uploads/2019/11/Untitled-design-17.png?ssl=1"
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
  about: {
    height: 500,
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
  },
}));
