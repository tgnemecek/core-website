import React from "react";
import moment from "moment-timezone";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import PlaceIcon from "@material-ui/icons/Place";
import LanguageIcon from "@material-ui/icons/Language";
import AlarmIcon from "@material-ui/icons/Alarm";
import { makeStyles } from "@material-ui/core/styles";
import { formatLanguage } from "utils";
import EventContext from "./EventContext";

type FeatureListProps = {
  dense?: boolean;
};

const FeatureList: React.FC<FeatureListProps> = ({ dense }) => {
  const {
    event: { duration, date, language },
    priceRange,
  } = React.useContext(EventContext)!;

  const classes = useStyles();

  const getDateWithDuration = () => {
    const startDate = moment(date);
    const endDate = startDate.clone().add(duration, "m");
    const start = startDate.format("h:mma");
    const end = endDate.format("h:mma");
    return `${start} to ${end} (${moment.tz(moment.tz.guess()).zoneAbbr()})`;
  };

  return (
    <List dense={dense}>
      <ListItem className={classes.listItem}>
        <ListItemIcon className={classes.listIcon}>
          <ConfirmationNumberIcon />
        </ListItemIcon>
        <ListItemText className={classes.listText}>{priceRange}</ListItemText>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemIcon className={classes.listIcon}>
          <PlaceIcon />
        </ListItemIcon>
        <ListItemText className={classes.listText}>Online</ListItemText>
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
  );
};

const useStyles = makeStyles((theme) => ({
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
}));

export default FeatureList;
