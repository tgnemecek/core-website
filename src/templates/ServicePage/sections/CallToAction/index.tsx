import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container } from "@material-ui/core";
import { SmoothScroll } from "components";

type CallToActionProps = {
  targetId: string;
  text: string;
};

const CallToAction: React.FC<CallToActionProps> = ({ targetId, text }) => {
  const classes = useStyles();

  return (
    <Container className={classes.callToActionContainer}>
      <SmoothScroll targetId={targetId}>
        <Button variant="contained" color="primary" component="a">
          <Typography variant="h3" component="span" className={classes.text}>
            {text}
          </Typography>
        </Button>
      </SmoothScroll>
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
