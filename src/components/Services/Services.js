import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Link from "Link/Link";

import Service from "./Service";

const SERVICES = [
  {
    title: "CORE Coaching",
    image:
      "https://i2.wp.com/thebestbrainpossible.com/wp-content/uploads/2019/11/Untitled-design-17.png?ssl=1",
    url: "/",
  },
  {
    title: "CORE Business",
    image:
      "https://i2.wp.com/thebestbrainpossible.com/wp-content/uploads/2019/11/Untitled-design-17.png?ssl=1",
    url: "/",
  },
  {
    title: "CORE Learning",
    image:
      "https://i2.wp.com/thebestbrainpossible.com/wp-content/uploads/2019/11/Untitled-design-17.png?ssl=1",
    url: "/",
  },
];

const Services = (props) => {
  const classes = useStyles();

  return (
    <section>
      <Container>
        <Typography variant="h2">Services</Typography>
        <Grid container className={classes.servicesContainer}>
          {SERVICES.map(({ title, image, url }, i) => {
            return (
              <Grid item key={i} xs={3}>
                <Service title={title} image={image} url={url} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </section>
  );
};

export default Services;

const useStyles = makeStyles((theme) => ({
  servicesContainer: {
    justifyContent: "space-around",
    height: 400,
    alignItems: "center",
  },
}));
