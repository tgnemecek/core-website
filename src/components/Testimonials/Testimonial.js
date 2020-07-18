import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, IconButton } from "@material-ui/core";

const duration = 1;
const transition = `opacity ${duration}s, left ${duration}s`;

const Testimonial = ({ testimonial, author, role }) => {
  const classes = useStyles();
  const [style, setStyle] = React.useState({ opacity: 0, left: "50px" });

  React.useEffect(() => {
    setStyle({ opacity: 1, left: 0 });
  }, []);

  return (
    <div style={{ ...style, transition, position: "relative" }}>
      <Typography variant="body2" className={classes.text}>
        {testimonial}
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
      >{`—${author}, ${role}`}</Typography>
    </div>
  );
};

export default Testimonial;

const useStyles = makeStyles((theme) => ({
  text: {
    fontStyle: "italic",
  },
}));
