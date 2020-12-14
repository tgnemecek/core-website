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
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import PlaceIcon from "@material-ui/icons/Place";
import LanguageIcon from "@material-ui/icons/Language";
import AlarmIcon from "@material-ui/icons/Alarm";
import { makeStyles } from "@material-ui/core/styles";
import { getTintedBackground, formatLanguage, useEventSettings } from "utils";
import { EventType } from "types";
import { Section } from "components";

type AsideProps = Pick<
  EventType,
  "date" | "isOnline" | "location" | "duration" | "language"
> & {
  toggleTicketsModal: () => void;
  priceRange: string;
};

const Aside: React.FC<AsideProps> = ({
  date,
  isOnline,
  location,
  duration,
  language,
  priceRange,
  toggleTicketsModal,
}) => {
  const classes = useStyles();
  const { refundPolicy } = useEventSettings();

  const getDateWithDuration = () => {
    const startDate = moment(date);
    const endDate = startDate.clone().add(duration, "m");
    const start = startDate.format("h:mma");
    const end = endDate.format("h:mma");
    const dur = duration >= 60 ? Math.round(duration / 60) : duration;
    let durLabel = "minutes";
    if (duration >= 60) {
      durLabel = "hour";
      if (duration >= 120) {
        durLabel += "s";
      }
    }
    return `${start} to ${end} (${dur} ${durLabel})`;
  };

  return (
    <>
      <aside className={classes.aside}>
        <Card raised className={classes.card}>
          <CardContent>
            <Typography variant="subtitle1">
              {moment(date).format("MMMM D, YYYY")}
            </Typography>
            <List>
              <ListItem className={classes.listItem}>
                <ListItemIcon className={classes.listIcon}>
                  <ConfirmationNumberIcon />
                </ListItemIcon>
                <ListItemText className={classes.listText}>
                  {priceRange}
                </ListItemText>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemIcon className={classes.listIcon}>
                  <PlaceIcon />
                </ListItemIcon>
                <ListItemText className={classes.listText}>
                  {isOnline ? "Online" : location}
                </ListItemText>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemIcon className={classes.listIcon}>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText className={classes.listText}>
                  {formatLanguage(language)}
                </ListItemText>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemIcon className={classes.listIcon}>
                  <AlarmIcon />
                </ListItemIcon>
                <ListItemText className={classes.listText}>
                  {getDateWithDuration()}
                </ListItemText>
              </ListItem>
            </List>
            <Typography variant="body1" className={classes.refundHeader}>
              Refund Policy
            </Typography>
            <Typography variant="body1" className={classes.refund}>
              {refundPolicy}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              className={classes.buy}
              onClick={toggleTicketsModal}
            >
              Buy
            </Button>
          </CardActions>
        </Card>
      </aside>
      <Section noShadows noPadding>
        <div className={classes.divider} />
      </Section>
    </>
  );
};

export default Aside;

const useStyles = makeStyles((theme) => ({
  aside: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    ...getTintedBackground(),
    boxShadow: "inset 27px 0px 14px -17px rgb(0 0 0 / 24%)",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "none",
      background: "none",
    },
  },
  card: {
    width: "calc(100% - 50px)",
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
      boxShadow: "none",
    },
  },
  divider: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      paddingBottom: theme.spacing(6),
    },
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  listIcon: {
    minWidth: 30,
  },
  listText: {
    "& > *": {
      fontSize: "0.9rem",
    },
  },
  refundHeader: {
    fontWeight: 500,
    fontSize: "0.9rem",
  },
  refund: {
    fontSize: "0.9rem",
    marginBottom: theme.spacing(5),
  },
  buy: {
    backgroundColor: theme.palette.success.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));
