import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, IconButton } from "@material-ui/core";
import Fade from "react-reveal/Fade";

const Testimonial = ({ testimonial, author, role }) => {
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
  },
  subText: {
    color: theme.palette.common.white,
    margin: 0,
  },
}));
