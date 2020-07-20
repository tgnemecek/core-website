import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as GatsbyLink } from "gatsby";
import Hero from "components/Hero";

const Link = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const className = () => {
    let result = classes.link;
    if (props.className) {
      return result + " " + props.className;
    }
    return result;
  };

  if (props.url && props.url[0] === "/") {
    return (
      <GatsbyLink className={className()} ref={ref} alt={props.alt}>
        {props.children}
      </GatsbyLink>
    );
  } else {
    return (
      <a
        href={props.to}
        className={className()}
        ref={ref}
        alt={props.alt}
        target="_blank"
        rel="noreferrer"
        {...props}
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
