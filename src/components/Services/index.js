import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import Section from "components/Section";
import Link from "components/Link";
import { theme } from "components/theme";

const hoverGrowth = 10; // Percent

const Services = ({ services }) => {
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

  const boxStyle = (service) => {
    if (hover === service) {
      return {
        backgroundColor: theme.palette.primary.main,
      };
    } else
      return {
        backgroundColor: "#151515bf",
      };
  };

  const descriptionStyle = (service) => {
    if (hover === service) {
      return {
        height: 100,
        paddingTop: 25,
      };
    } else
      return {
        height: 0,
        paddingTop: 0,
      };
  };

  return (
    <div className={classes.servicesBackground}>
      <section className={classes.services}>
        <Typography variant="srOnly" component="h2">
          Services
        </Typography>
        <Grid container className={classes.servicesContainer}>
          {services.map(({ title, image, name, description }, i) => (
            <Grid
              item
              key={i}
              component={Link}
              to={`/${name}`}
              onMouseEnter={() => onMouseEnter(name)}
              onMouseLeave={() => onMouseLeave(name)}
              xs={12}
              md={4}
              className={classes.serviceWrapper}
            >
              <img src={image} className={classes.img} style={imgStyle(name)} />
              <div className={classes.textBox} style={boxStyle(name)}>
                <Typography variant="h3">{title}</Typography>
                <Typography
                  variant="body1"
                  style={descriptionStyle(name)}
                  className={classes.description}
                >
                  {description}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </section>
    </div>
  );
};

export default Services;

const useStyles = makeStyles((theme) => {
  return {
    servicesBackground: {
      backgroundColor: theme.palette.common.white,
    },
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
      padding: `${theme.spacing(6)}px 0`,
      overflow: "hidden",
      "& button": {
        fontSize: "1rem",
      },
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
    textBox: {
      zIndex: 1,
      width: "100%",
      textAlign: "center",
      padding: theme.spacing(2),
      boxShadow: "0px -7px 10px 0px rgba(0,0,0,0.37)",
      transition: "background-color 0.7s",
      "& h3": {
        color: theme.palette.common.white,
        margin: 0,
      },
    },
    description: {
      lineHeight: 1,
      color: theme.palette.common.white,
      fontWeight: 300,
      overflow: "hidden",
      transition: "height 0.7s, padding-top 0.7s",
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
