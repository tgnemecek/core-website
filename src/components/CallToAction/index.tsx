import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container } from "@material-ui/core";

type CallToActionProps = {
  href: string;
  text: string;
};

const CallToAction: React.FC<CallToActionProps> = ({ href, text }) => {
  const classes = useStyles();

  return (
    <Container className={classes.callToActionContainer}>
      <Button variant="contained" color="primary" component="a" href={href}>
        <Typography variant="h3" component="span" className={classes.text}>
          {text}
        </Typography>
      </Button>
    </Container>
  );
};

export default CallToAction;

const useStyles = makeStyles((theme) => ({
  callToActionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.palette.common.white,
    margin: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  },
}));
