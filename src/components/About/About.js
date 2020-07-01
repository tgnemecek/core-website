import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Link from "components/Link/Link";

const About = (props) => {
  const classes = useStyles();

  return (
    <section>
      <Container>
        <Typography variant="h2">About</Typography>
        <Grid container spacing={5} justify="space-between">
          <Grid item xs={6}>
            <div className={classes.textWrapper}>
              <Typography variant="body1" className={classes.text}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                dicta minus molestiae vel beatae natus eveniet ratione
                temporibus aperiam harum alias officiis assumenda officia
                quibusdam deleniti eos cupiditate dolore doloribus
              </Typography>
            </div>
          </Grid>
          <Grid item xs={5}>
            <img
              className={classes.image}
              src="https://i2.wp.com/thebestbrainpossible.com/wp-content/uploads/2019/11/Untitled-design-17.png?ssl=1"
              alt="Team"
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default About;

const useStyles = makeStyles((theme) => ({
  textWrapper: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  text: {
    fontSize: theme.typography.h3.fontSize,
  },
  image: {
    width: "100%",
  },
}));
