import React from "react";
import { Container, Typography } from "@material-ui/core";

import Section from "components/Section";
import HorizontalFeed from "components/HorizontalFeed";
import Event from "./Event";
import { EventDTO } from "./types";

const skeletonHeight = 440;

const Events: React.FC = () => {
  const [events, setEvents] = React.useState<EventDTO[]>(null);

  React.useEffect(() => {
    fetch("/.netlify/functions/eventbrite").then((res) =>
      res.json().then((data) => {
        setEvents(data.events as EventDTO[]);
      })
    );
  }, []);

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
        {events && events.map((event, i) => <Event key={i} {...event} />)}
      </HorizontalFeed>
    </Section>
  );
};

export default Events;
