import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as GatsbyLink } from "gatsby";

export default function Link(props) {
  const classes = useStyles();

  return <GatsbyLink className={classes.link} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
  },
}));
