import React from "react";
import PropTypes from "prop-types";
import { Container, Typography } from "@material-ui/core";

import HorizontalFeed from "components/HorizontalFeed/HorizontalFeed";

const TEMP_DATA = [
  {
    title: "New Members Meetup",
    date: new Date(),
    url: "http://www.google.com",
    image:
      "https://i2.wp.com/thebestbrainpossible.com/wp-content/uploads/2019/11/Untitled-design-17.png?ssl=1",
  },
  {
    title: "Group Yoga",
    date: new Date(),
    url: "http://www.google.com",
    image:
      "https://i2.wp.com/thebestbrainpossible.com/wp-content/uploads/2019/11/Untitled-design-17.png?ssl=1",
  },
  {
    title: "Mastering the Core",
    date: new Date(),
    url: "http://www.google.com",
    image:
      "https://i2.wp.com/thebestbrainpossible.com/wp-content/uploads/2019/11/Untitled-design-17.png?ssl=1",
  },
  {
    title: "Careers Podcast",
    date: new Date(),
    url: "http://www.google.com",
    image:
      "https://i2.wp.com/thebestbrainpossible.com/wp-content/uploads/2019/11/Untitled-design-17.png?ssl=1",
  },
];

export default function Events() {
  const [events, setEvents] = React.useState(null);

  React.useEffect(() => {
    // Fetch
    setTimeout(() => {
      const data = TEMP_DATA;
      setEvents(data);
    }, 2000);
  }, []);

  return (
    <section>
      <Container>
        <Typography variant="h2">Events</Typography>
      </Container>
      <HorizontalFeed items={events} />
    </section>
  );
}
