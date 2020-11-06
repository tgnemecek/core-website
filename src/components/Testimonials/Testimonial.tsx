import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { TestimonialType } from "./types";

type TestimonialProps = TestimonialType;

const Testimonial: React.FC<TestimonialProps> = ({
  testimonial,
  author,
  role,
}) => {
  const classes = useStyles();

  return (
    <Fade>
      <Typography variant="body2" component="p" className={classes.text}>
        {testimonial}
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        className={classes.subText}
      >{`— ${author}, ${role}`}</Typography>
    </Fade>
  );
};

export default Testimonial;

const useStyles = makeStyles((theme) => ({
  text: {
    fontStyle: "italic",
    color: theme.palette.common.white,
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  subText: {
    color: theme.palette.common.white,
    margin: 0,
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9rem",
    },
  },
}));
