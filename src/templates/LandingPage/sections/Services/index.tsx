import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { Link } from "gatsby";
import { theme } from "components";
import { Service } from "types";
import ServiceImage from "./ServiceImage";

type ServicesProps = {
  services: Service[];
};

const Services: React.FC<ServicesProps> = ({ services }) => {
  const [hover, setHover] = React.useState<string | null>(null);
  const classes = useStyles();

  const onMouseEnter = (name: string) => {
    setHover(name);
  };

  const onMouseLeave = (name: string) => {
    if (hover === name) {
      setHover(null);
    }
  };

  const boxStyle = (name: string) => {
    if (hover === name) {
      return {
        backgroundColor: theme.palette.primary.main,
      };
    } else
      return {
        backgroundColor: "#151515bf",
      };
  };

  const descriptionStyle = (name: string) => {
    if (hover === name) {
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
          {services.map(({ title, image, name, description }) => (
            <Grid
              item
              key={name}
              component={Link}
              to={`/${name}`}
              onMouseEnter={() => onMouseEnter(name)}
              onMouseLeave={() => onMouseLeave(name)}
              xs={12}
              md={4}
              className={classes.serviceWrapper}
            >
              <ServiceImage
                alt={title}
                src={image}
                isHovering={hover === name}
                isHoveringAnotherItem={Boolean(hover && hover !== name)}
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
