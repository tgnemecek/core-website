import React from "react";
import {
  Typography,
  CircularProgress,
  Modal,
  Dialog,
  Button,
  Paper,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useTransition, animated } from "react-spring";
import EventContext from "./../../EventContext";
import ModalFooter from "./ModalFooter";

type ResultMessageProps = {
  title: string;
  subtitle: string;
  code?: string;
  type: "success" | "failed";
};

const ResultMessage: React.FC<ResultMessageProps> = ({
  title,
  subtitle,
  code,
  type,
}) => {
  const { setTicketsModalOpen } = React.useContext(EventContext);

  const classes = useStyles();

  const [showIcon, setShowIcon] = React.useState(false);
  const [showButton, setShowButton] = React.useState(false);

  const iconTransitions = useTransition(showIcon, null, {
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
    setShowIcon(true);
    setTimeout(() => {
      setShowButton(true);
    }, 1000);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.textWrapper}>
        <div>
          {iconTransitions.map(
            ({ item, key, props }) =>
              item && (
                <animated.div
                  key={key}
                  style={{ ...props, display: "inline-block" }}
                >
                  {type === "success" ? (
                    <CheckIcon className={classes.checkmark} />
                  ) : (
                    <CloseIcon className={classes.x} />
                  )}
                </animated.div>
              )
          )}
        </div>
        <Typography variant="body1" className={classes.thanks}>
          {title}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          {subtitle}
        </Typography>
        <Typography variant="body1" className={classes.code}>
          {code}
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
  x: {
    border: `5px solid ${theme.palette.error.main}`,
    borderRadius: "50%",
    fontSize: "100px",
    color: theme.palette.error.main,
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

export default ResultMessage;
