import React from "react";
import Fade from "react-reveal/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const titleMaxLength = 25;

export default function Item({
  children,
  itemWidth,
  delay = 0,
  animation = true,
}) {
  const classes = useStyles({ itemWidth })();

  if (!animation) {
    return (
      <Grid item>
        <div className={classes.item}>{children}</div>
      </Grid>
    );
  }

  return (
    <Grid item>
      <Fade delay={delay}>
        <div className={classes.item}>{children}</div>
      </Fade>
    </Grid>
  );
}

const useStyles = ({ itemWidth }) =>
  makeStyles((theme) => ({
    item: {
      minWidth: itemWidth,
      maxWidth: itemWidth,
    },
  }));
