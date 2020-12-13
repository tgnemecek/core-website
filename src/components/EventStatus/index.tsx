import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";

type EventStatusProps = {
  date: Date;
  duration: number;
};

const EventStatus: React.FC<EventStatusProps> = ({ date, duration }) => {
  const classes = useStyles();
  const dateStart = moment(date);
  const dateEnd = moment(date).add(duration, "minutes");
  const now = moment();

  if (now.isBefore(dateStart)) {
    return (
      <Chip
        label={dateStart.format("MMM D")}
        size="small"
        className={`${classes.eventStatus} ${classes.eventUpcoming}`}
      />
    );
  }
  if (now.isAfter(dateEnd)) {
    return (
      <Chip
        label="Event Ended"
        size="small"
        className={`${classes.eventStatus} ${classes.eventEnded}`}
      />
    );
  }
  return (
    <Chip
      label="Live"
      size="small"
      className={`${classes.eventStatus} ${classes.eventLive}`}
    />
  );
};

export default EventStatus;

const useStyles = makeStyles((theme) => ({
  eventStatus: {
    "& span": {
      fontSize: "0.8rem",
    },
  },
  eventUpcoming: {
    backgroundColor: "#03a9f4",
    color: "white",
  },
  eventEnded: {
    backgroundColor: "#fa5555",
    color: "white",
  },
  eventLive: {
    backgroundColor: "#55bd41",
    color: "white",
  },
}));
