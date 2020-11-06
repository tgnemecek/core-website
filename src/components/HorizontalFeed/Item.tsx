import React from "react";
import PropTypes from "prop-types";
import Fade from "react-reveal/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const titleMaxLength = 25;

type ItemProps = {
  itemWidth: number;
  delay?: number;
  animation?: boolean;
};

const Item: React.FC<ItemProps> = ({
  children,
  itemWidth,
  delay = 0,
  animation = true,
}) => {
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
};

export default Item;

type UseStylesProps = {
  itemWidth: number;
};

const useStyles = ({ itemWidth }: UseStylesProps) =>
  makeStyles((theme) => ({
    item: {
      minWidth: itemWidth,
      maxWidth: itemWidth,
    },
  }));
