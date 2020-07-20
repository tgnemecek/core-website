import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import Section from "components/Section";
import Link from "components/Link";
import coachingImg from "src/img/services-coaching.jpg";
import businessImg from "src/img/services-business.jpg";
import learningImg from "src/img/services-learning.jpg";

import Service from "./Service";

const hoverGrowth = 10; // Percent

const Services = (props) => {
  const [hover, setHover] = React.useState(null);
  const classes = useStyles();

  const onMouseEnter = (service) => {
    setHover(service);
  };

  const onMouseLeave = (service) => {
    if (hover === service) {
      setHover(null);
    }
  };

  const imgStyle = (service) => {
    if (!hover) return {};
    if (hover === service) {
      return {
        height: `${100 + hoverGrowth}%`,
        width: `${100 + hoverGrowth}%`,
        top: `-${hoverGrowth / 2}%`,
        left: `-${hoverGrowth / 2}%`,
      };
    } else {
      return {
        filter: "grayscale(100%) contrast(50%)",
      };
    }
  };

  return (
    <section className={classes.services}>
      <Typography variant="srOnly" component="h2">
        Services
      </Typography>
      <Grid container className={classes.servicesContainer}>
        <Grid
          item
          component={Link}
          to="/coaching"
          onMouseEnter={() => onMouseEnter("coaching")}
          onMouseLeave={() => onMouseLeave("coaching")}
          sm={12}
          md={4}
          className={classes.serviceWrapper}
        >
          <img
            src={coachingImg}
            className={classes.img}
            style={imgStyle("coaching")}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            component="div"
          >
            CORE Coaching
          </Button>
        </Grid>
        <Grid
          item
          component={Link}
          to="/business"
          onMouseEnter={() => onMouseEnter("business")}
          onMouseLeave={() => onMouseLeave("business")}
          sm={12}
          md={4}
          className={classes.serviceWrapper}
        >
          <img
            src={businessImg}
            className={`${classes.img} ${classes.businessImg}`}
            style={imgStyle("business")}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            component="div"
          >
            CORE Business
          </Button>
        </Grid>
        <Grid
          item
          component={Link}
          to="/learning"
          onMouseEnter={() => onMouseEnter("learning")}
          onMouseLeave={() => onMouseLeave("learning")}
          sm={12}
          md={4}
          className={classes.serviceWrapper}
        >
          <img
            src={learningImg}
            className={classes.img}
            style={imgStyle("learning")}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            component="div"
          >
            CORE Learning
          </Button>
        </Grid>
      </Grid>
    </section>
  );
};

export default Services;

const useStyles = makeStyles((theme) => {
  return {
    services: {
      maxWidth: 1700,
      margin: "auto",
    },
    serviceWrapper: {
      border: "none",
      width: "calc(100% / 3)",
      position: "relative",
      height: 700,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      padding: theme.spacing(6),
      overflow: "hidden",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0,
      transition: "all 0.5s",
    },
    [theme.breakpoints.down("sm")]: {
      serviceWrapper: {
        height: 200,
      },
      businessImg: {
        // top: "40%",
        // height: "140%",
      },
    },
  };
});
