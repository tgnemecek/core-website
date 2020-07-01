import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as GatsbyLink } from "gatsby";

const Link = React.forwardRef((props, ref) => {
  const classes = useStyles();

  if (props.url && props.url[0] === "/") {
    return (
      <GatsbyLink className={classes.link} ref={ref} alt={props.alt}>
        {props.children}
      </GatsbyLink>
    );
  } else {
    return (
      <a
        href={props.to}
        className={classes.link}
        ref={ref}
        alt={props.alt}
        target="_blank"
        rel="noreferrer"
      >
        {props.children}
      </a>
    );
  }
});

export default Link;

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
  },
}));
