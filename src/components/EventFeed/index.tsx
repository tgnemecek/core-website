import React from "react";
import moment from "moment";
import { Container, Typography } from "@material-ui/core";
import { Section, HorizontalFeed, Heading } from "components";
import { useEventFeed } from "utils";
import { EventFeed as EventFeedType } from "types";
import EventCard from "./EventCard";

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
        <Heading subheading="Latest updates about our online events" showLine>
          {title}
        </Heading>
      </Container>
      <Container>
        <HorizontalFeed
          items={[...events].sort(sorter).map((event, i) => (
            <EventCard key={i} event={event} />
          ))}
        />
      </Container>
    </Section>
  );
};

export default EventFeed;
