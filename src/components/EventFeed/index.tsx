import React from "react";
import { Container, Typography } from "@material-ui/core";
import { Section, HorizontalFeed } from "components";
import { useEventFeed } from "utils";
import Event from "./Event";

const skeletonHeight = 440;

const EventFeed: React.FC = () => {
  const events = useEventFeed();
  return (
    <Section id="events">
      <Container>
        <Typography variant="h2">
          Leading Your Life &amp; Work Events
        </Typography>
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
