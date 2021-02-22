import React from "react";
import moment from "moment";
import { graphql, PageProps } from "gatsby";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  Typography,
  CircularProgress,
  Modal,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { TicketType } from "types";
import { isTicketValid } from "utils";
import EventContext from "../../EventContext";

type TicketsMainProps = {
  goToCheckout: () => void;
  setChosenTicket: React.Dispatch<React.SetStateAction<TicketType>>;
};

const TicketsMain: React.FC<TicketsMainProps> = ({
  goToCheckout,
  setChosenTicket,
}) => {
  const {
    event: { tickets, date },
  } = React.useContext(EventContext);

  const classes = useStyles();

  const getEndsOnText = (endsOn: TicketType["endsOn"]) => {
    if (endsOn === "startOfEvent") {
      return "Sale ends at the start of the event";
    }
    if (endsOn === "startOfDay") {
      return "Sale ends at the day of the event";
    }
    if (endsOn === "oneWeek") {
      return "Sale ends one week before the event";
    }
    return null;
  };

  const getListItemClassName = (i: number) => {
    const baseClassName = classes.listItem;
    if (i % 2 !== 0) {
      return `${baseClassName} ${classes.oddListItem}`;
    }
    return baseClassName;
  };

  const handleClick = (ticket: TicketType) => {
    setChosenTicket(ticket);
    goToCheckout();
  };

  return (
    <div className={classes.container}>
      <List className={classes.list} disablePadding>
        {tickets
          .filter(({ endsOn }) => isTicketValid(endsOn, date))
          .map((ticket, i) => (
            <ListItem
              key={ticket.id}
              className={getListItemClassName(i)}
              onClick={() => handleClick(ticket)}
              disableGutters
            >
              <ListItemIcon>
                <BookmarkIcon className={classes.listIcon} />
              </ListItemIcon>
              <div>
                <Typography variant="h6" className={classes.ticketDescription}>
                  {ticket.description}
                </Typography>
                <Typography variant="body1" className={classes.ticketPrice}>
                  ${ticket.price}
                </Typography>
                <Typography variant="body1" className={classes.ticketEndsOn}>
                  {getEndsOnText(ticket.endsOn)}
                </Typography>
              </div>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 476,
    overflow: "auto",
    margin: "30px 0",
    padding: 50,
    [theme.breakpoints.down("sm")]: {
      padding: 25,
    },
  },
  list: {
    width: "100%",
    boxShadow: theme.shadows[2],
  },
  listItem: {
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      cursor: "pointer",
      "& *": {
        color: "white",
      },
    },
  },
  oddListItem: {
    backgroundColor: theme.palette.grey[50],
  },
  listIcon: {
    margin: "auto",
    transition: "all 0.3s",
  },
  ticketDescription: {
    fontSize: "1rem",
    transition: "all 0.3s",
  },
  ticketPrice: {
    fontSize: "0.9rem",
    transition: "all 0.3s",
  },
  ticketEndsOn: {
    fontSize: "0.9rem",
    transition: "all 0.3s",
  },
}));

export default TicketsMain;
