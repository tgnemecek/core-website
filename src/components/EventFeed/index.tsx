import React from "react";
import { Container, Typography } from "@material-ui/core";
import { Section, HorizontalFeed } from "components";
import { useEventFeed } from "utils";
import { EventFeedType } from "types";
import Event from "./Event";

const skeletonHeight = 440;

type EventFeedProps = {
  title: string;
  filter?: (event: EventFeedType) => boolean;
};

const EventFeed: React.FC<EventFeedProps> = ({ title, filter }) => {
  const events = useEventFeed().filter(filter || Boolean);

  return (
    <Section id="events">
      <Container>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="subtitle1" component="p">
          Latest updates about our online and in-person events
        </Typography>
      </Container>
      <HorizontalFeed skeletonHeight={skeletonHeight}>
        {events && events.map((event, i) => <Event key={i} event={event} />)}
      </HorizontalFeed>
    </Section>
  );
};

export default EventFeed;
