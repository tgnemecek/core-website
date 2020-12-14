import React from "react";
import moment from "moment";
import { Container, Typography, IconButton } from "@material-ui/core";
import { Section, HorizontalFeed } from "components";
import { useEventFeed } from "utils";
import { EventFeedType } from "types";
import Event from "./Event";

type EventFeedProps = {
  title: string;
  filter?: (event: EventFeedType) => boolean;
};

const EventFeed: React.FC<EventFeedProps> = ({ title, filter }) => {
  const events = useEventFeed().filter(filter || Boolean);

  const sorter = (
    { date: dateA }: EventFeedType,
    { date: dateB }: EventFeedType
  ) => {
    const momentA = moment(dateA);
    const momentB = moment(dateB);

    if (momentA.isAfter(momentB)) return -1;
    if (momentA.isBefore(momentB)) return 1;
    return 0;
  };

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
          items={events.sort(sorter).map((event, i) => (
            <Event key={i} event={event} />
          ))}
        />
      </Container>
    </Section>
  );
};

export default EventFeed;
