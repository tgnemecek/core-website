import React from "react";
import moment from "moment";
import {
  Container,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import PlaceIcon from "@material-ui/icons/Place";
import LanguageIcon from "@material-ui/icons/Language";
import AlarmIcon from "@material-ui/icons/Alarm";
import { makeStyles } from "@material-ui/core/styles";
import { EventType } from "types";

type FixedBarProps = {
  openCheckout: () => void;
  isEventValid: boolean;
  alreadyPurchased: boolean;
  loading: boolean;
};

const FixedBar: React.FC<FixedBarProps> = ({
  openCheckout,
  isEventValid,
  alreadyPurchased,
  loading,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.fixedBar}>
      <Button
        size="large"
        variant="contained"
        className={classes.buy}
        onClick={openCheckout}
        disabled={alreadyPurchased || loading || !isEventValid}
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
