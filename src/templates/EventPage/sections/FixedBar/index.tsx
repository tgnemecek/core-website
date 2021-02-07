import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { isEventValid } from "utils";
import EventContext from "../../EventContext";

const FixedBar: React.FC = () => {
  const {
    setTicketsModalOpen,
    alreadyPurchased,
    loading,
    event,
  } = React.useContext(EventContext);

  const classes = useStyles();
  return (
    <div className={classes.fixedBar}>
      <Button
        size="large"
        variant="contained"
        className={classes.buy}
        onClick={() => setTicketsModalOpen(true)}
        disabled={alreadyPurchased || loading || !isEventValid(event)}
      >
        <div>{alreadyPurchased ? "Ticket Purchased" : "Buy Ticket"}</div>
      </Button>
    </div>
  );
};

export default FixedBar;

const useStyles = makeStyles((theme) => ({
  fixedBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: "white",
    zIndex: 1,
    "&:before": {
      content: "''",
      position: "absolute",
      boxShadow: "inset 0px -3px 10px -10px #000000",
      width: "100%",
      height: "100%",
      bottom: "100%",
    },
  },
  buy: {
    backgroundColor: theme.palette.success.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));
