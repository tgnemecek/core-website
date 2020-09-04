import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { Button, Typography, Container } from "@material-ui/core";

const ScheduleButton = ({ href, text }) => {
  const classes = useStyles();

  return (
    <Container className={classes.scheduleButtonContainer}>
      <Button
        variant="contained"
        color="primary"
        component="a"
        target="_blank"
        rel="noreferrer"
        href={href}
      >
        <Typography variant="h3" component="span" className={classes.text}>
          {text}
        </Typography>
      </Button>
    </Container>
  );
};

export default ScheduleButton;

const useStyles = makeStyles((theme) => ({
  scheduleButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.palette.common.white,
    margin: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  },
}));
