import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

import HorizontalFeed from "components/HorizontalFeed/HorizontalFeed";

export default function Events() {
  const classes = useStyles();
  const [events, setEvents] = React.useState(null);

  React.useEffect(() => {
    fetch("/.netlify/functions/eventbrite").then((res) =>
      res.json().then((data) => {
        console.log(data);
        setEvents(data.events);
      })
    );
  }, []);

  return (
    <section className={classes.events}>
      <Container>
        <Typography variant="h2">Events</Typography>
      </Container>
      <HorizontalFeed items={events} />
    </section>
  );
}

const useStyles = makeStyles((theme) => ({
  events: {
    height: 500,
  },
}));
