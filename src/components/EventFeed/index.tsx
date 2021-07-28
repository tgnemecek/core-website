import React from "react";
import moment from "moment";
import { Container, Typography, IconButton } from "@material-ui/core";
import { Section, HorizontalFeed } from "components";
import { useEventFeed } from "utils";
import { EventFeed } from "types";
import Event from "./Event";

type EventFeedProps = {
  title: string;
  filter?: (event: EventFeed) => boolean;
};

const EventFeed: React.FC<EventFeedProps> = ({ title, filter }) => {
  const events = useEventFeed().filter(filter || Boolean);

  const sorter = ({ date: dateA }: EventFeed, { date: dateB }: EventFeed) => {
    const now = moment();
    const momentA = moment(dateA);
    const momentB = moment(dateB);

    let aIsPast = false;
    let bIsPast = false;

    if (momentA.isBefore(now)) aIsPast = true;
    if (momentB.isBefore(now)) bIsPast = true;

    if (aIsPast && bIsPast) {
      if (momentA.isAfter(momentB)) return -1;
      return 1;
    }
    if (!aIsPast && !bIsPast) {
      if (momentA.isAfter(momentB)) return 1;
      return -1;
    }

    if (bIsPast) return -1;
    return 1;
  };

  if (!events.length) return null;

  return (
    <Section id="events">
      <Container>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="subtitle1" component="p">
          Latest updates about our online and in person events
        </Typography>
      </Container>
      <Container>
        <HorizontalFeed
          items={[...events].sort(sorter).map((event, i) => (
            <Event key={i} event={event} />
          ))}
        />
      </Container>
    </Section>
  );
};

export default EventFeed;
