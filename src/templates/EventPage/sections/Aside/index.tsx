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
import { getTintedBackground, formatLanguage } from "utils";
import { EventType } from "types";

type AsideProps = Pick<
  EventType,
  "date" | "isOnline" | "location" | "duration" | "language"
> & {
  toggleTicketsModal: () => void;
};

const Aside: React.FC<AsideProps> = ({
  date,
  isOnline,
  location,
  duration,
  language,
}) => {
  const classes = useStyles();

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
    <aside className={classes.aside}>
      <Card raised className={classes.card}>
        <CardContent>
          <Typography variant="subtitle1">
            {moment(date).format("MMMM D, YYYY")}
          </Typography>
          <List>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
            Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos.
            Curabitur sodales ligula in libero.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" className={classes.buy}>
            Buy
          </Button>
        </CardActions>
      </Card>
    </aside>
  );
};

export default Aside;

const useStyles = makeStyles((theme) => ({
  aside: {
    ...getTintedBackground(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "calc(100% - 50px)",
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
