import React from "react";
import { Typography, Button } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useSpring, animated } from "react-spring";
import EventContext from "./../../EventContext";
import ModalFooter from "./ModalFooter";

type ResultMessageProps = {
  title: string;
  subtitle: string;
  type: "success" | "failed";
};

const ResultMessage: React.FC<ResultMessageProps> = ({
  title,
  subtitle,
  type,
}) => {
  const { setTicketsModalOpen } = React.useContext(EventContext)!;

  const classes = useStyles();

<<<<<<< HEAD
  const [iconStyles, iconTransition] = useSpring(() => ({
    transform: "rotateZ(-40deg)",
    opacity: 0,
=======
  const [showIcon, setShowIcon] = React.useState(false);
  const [showButton, setShowButton] = React.useState(false);

  const iconTransitions = useTransition(showIcon, null, {
>>>>>>> @{-1}
    config: {
      friction: 100,
      tension: 200,
    },
<<<<<<< HEAD
  }));

  const [buttonStyles, buttonTransition] = useSpring(() => ({
    left: -50,
    opacity: 0,
=======
    from: { transform: "rotateZ(-40deg)", opacity: 0 },
    enter: { transform: "rotateZ(0deg)", opacity: 1 },
  });
  const buttonTransitions = useTransition(showButton, null, {
>>>>>>> @{-1}
    config: {
      friction: 50,
      mass: 1,
      tension: 200,
    },
<<<<<<< HEAD
  }));
=======
    from: { left: -50, opacity: 0 },
    enter: { left: 0, opacity: 1 },
  });
>>>>>>> @{-1}

  React.useEffect(() => {
    iconTransition.start({
      transform: "rotateZ(0deg)",
      opacity: 1,
    });

    buttonTransition.start({
      left: 0,
      opacity: 1,
      delay: 1000,
    });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.textWrapper}>
        <div>
          <animated.div style={{ ...iconStyles, display: "inline-block" }}>
            {type === "success" ? (
              <CheckIcon className={classes.checkmark} />
            ) : (
              <CloseIcon className={classes.x} />
            )}
          </animated.div>
        </div>
        <Typography variant="body1" className={classes.thanks}>
          {title}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          {subtitle}
        </Typography>
      </div>
      <ModalFooter>
        <animated.div style={{ ...buttonStyles, position: "relative" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setTicketsModalOpen(false)}
          >
            Go Back
          </Button>
        </animated.div>
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
}));

export default ResultMessage;
