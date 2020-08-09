import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

import Section from "components/Section";
import HorizontalFeed from "components/HorizontalFeed";
import Event from "./Event";

const skeletonHeight = 440;

export default function Events() {
  const classes = useStyles();
  const [events, setEvents] = React.useState(null);

  React.useEffect(() => {
    fetch("/.netlify/functions/eventbrite").then((res) =>
      res.json().then((data) => {
        setEvents(data.events);
      })
    );
  }, []);

  return (
    <Section id="events">
      <Container className={classes.headingWrapper}>
        <Typography variant="h2">
          Leading Your Life &amp; Work Events
        </Typography>
        <Typography variant="subtitle1" component="p">
          Latest updates about our online and in-person events
        </Typography>
        <div className={classes.feedWrapper}>
          <HorizontalFeed skeletonHeight={skeletonHeight}>
            {events && events.map((event, i) => <Event key={i} {...event} />)}
          </HorizontalFeed>
        </div>
      </Container>
    </Section>
  );
}

const useStyles = makeStyles((theme) => ({
  feedWrapper: {
    padding: `0 ${theme.spacing(3)}px`,
  },
}));
