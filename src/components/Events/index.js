import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

import Section from "components/Section";
import HorizontalFeed from "components/HorizontalFeed";

export default function Events({ isPreview }) {
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
        <Typography variant="h2">Events</Typography>
        <Typography variant="subtitle1" component="p">
          Latest updates about our online and in-person events
        </Typography>
      </Container>
      <HorizontalFeed items={events} />
    </Section>
  );
}

const useStyles = makeStyles((theme) => ({}));
