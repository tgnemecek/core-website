import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "gatsby";
import { useBreakpoint } from "src/util";
import { theme } from "components/theme";
import Image from "components/Image";

const hoverGrowth = 10; // Percent

const Services = ({ services }) => {
  const [hover, setHover] = React.useState(null);
  const classes = useStyles();
  const { md } = useBreakpoint();

  const onMouseEnter = (service) => {
    setHover(service);
  };

  const onMouseLeave = (service) => {
    if (hover === service) {
      setHover(null);
    }
  };

  const imgProps = (service) => {
    let result = {};
    if (hover === service) {
      result = {
        style: {
          height: `${100 + hoverGrowth}%`,
          width: `${100 + hoverGrowth}%`,
          top: `-${hoverGrowth / 2}%`,
          left: `-${hoverGrowth / 2}%`,
        },
      };
    } else if (hover) {
      result = {
        style: {
          filter: "grayscale(100%) contrast(50%)",
        },
      };
    }
    if (!md) {
      result = {
        ...result,
        width: "900",
        height: "220",
      };
    }
    return result;
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
        <Grid container className={classes.servicesGridContainer}>
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
              <Image
                className={classes.img}
                src={image}
                width="366"
                height="700"
                {...imgProps(name)}
              />
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
      maxWidth: 1100,
      margin: "auto",
      padding: "50px 0",
    },
    servicesGridContainer: {
      boxShadow: "0px 14px 43px -14px rgba(0,0,0,0.64)",
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
    },
  };
});
