import React from "react";
import {
  Typography,
  CircularProgress,
  Modal,
  Dialog,
  Button,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import { useTransition, animated } from "react-spring";
import EventContext from "./../../EventContext";
import ModalFooter from "./ModalFooter";

type SuccessMessageProps = {};

const SuccessMessage: React.FC<SuccessMessageProps> = () => {
  const { setTicketsModalOpen } = React.useContext(EventContext);

  const classes = useStyles();

  const [showCheckmark, setShowCheckmark] = React.useState(false);
  const [showButton, setShowButton] = React.useState(false);

  const checkmarkTransitions = useTransition(showCheckmark, null, {
    config: {
      friction: 100,
      tension: 200,
    },
    from: { transform: "rotateZ(-40deg)", opacity: 0 },
    enter: { transform: "rotateZ(0deg)", opacity: 1 },
  });
  const buttonTransitions = useTransition(showButton, null, {
    config: {
      friction: 50,
      mass: 1,
      tension: 200,
    },
    from: { left: -50, opacity: 0 },
    enter: { left: 0, opacity: 1 },
  });

  React.useEffect(() => {
    setShowCheckmark(true);
    setTimeout(() => {
      setShowButton(true);
    }, 1000);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.textWrapper}>
        <div>
          {checkmarkTransitions.map(
            ({ item, key, props }) =>
              item && (
                <animated.div
                  key={key}
                  style={{ ...props, display: "inline-block" }}
                >
                  <CheckIcon className={classes.checkmark} />
                </animated.div>
              )
          )}
        </div>
        <Typography variant="body1" className={classes.thanks}>
          Thank you for the purchase!
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Please check your email for more information about the event and
          instructions on how to join.
        </Typography>
        <Typography variant="body1" className={classes.code}>
          Confirmation code: #123123123
        </Typography>
      </div>
      <ModalFooter>
        {buttonTransitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={{ ...props, position: "relative" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setTicketsModalOpen(false)}
                >
                  Go Back
                </Button>
              </animated.div>
            )
        )}
      </ModalFooter>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateRows: "1fr auto",
  },
  textWrapper: {
    textAlign: "center",
    margin: "auto",
    maxWidth: 400,
  },
  checkmark: {
    border: `5px solid ${theme.palette.success.main}`,
    borderRadius: "50%",
    fontSize: "100px",
    color: theme.palette.success.main,
  },
  thanks: {
    fontWeight: "bold",
  },
  info: {
    fontSize: "0.9rem",
  },
  code: {
    fontSize: "0.8rem",
  },
}));

export default SuccessMessage;
