import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import { EventType } from "types";
import { getEventStatus } from "utils";

type EventStatusProps = {
  tickets?: EventType["tickets"];
  isEventValid?: boolean;
  date?: Date;
  showDate?: boolean;
};

const EventStatus: React.FC<EventStatusProps> = ({
  tickets = [],
  isEventValid,
  date,
  showDate,
}) => {
  const classes = useStyles();

  if (isEventValid || getEventStatus({ tickets, date })) {
    if (!showDate) return null;
    return (
      <Chip
        label={moment(date).format("MMM D")}
        size="small"
        className={`${classes.eventStatus} ${classes.eventUpcoming}`}
      />
    );
  }

  return (
    <Chip
      label="Event Ended"
      size="small"
      className={`${classes.eventStatus} ${classes.eventEnded}`}
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
