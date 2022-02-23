import React from "react";
import { isBefore } from "date-fns";
import { Container } from "@material-ui/core";
import { Section, HorizontalFeed, Heading } from "components";
import { useEventFeed } from "utils";
import { EventFeed as EventFeedType } from "types";
import EventCard from "./EventCard";

type EventsSectionProps = {
  filter?: (event: EventFeedType) => boolean;
};

const EventsSection: React.FC<EventsSectionProps> = ({ filter }) => {
  const { events: unfilteredEvents, heading, subheading } = useEventFeed();

  const events = unfilteredEvents.filter(filter || Boolean);

  const sorter = (
    { date: dateA }: EventFeedType,
    { date: dateB }: EventFeedType
  ) => {
    const now = new Date();

    let aIsPast = false;
    let bIsPast = false;

    if (isBefore(dateA, now)) aIsPast = true;
    if (isBefore(dateB, now)) bIsPast = true;

    if (aIsPast && bIsPast) {
      if (isBefore(dateB, dateA)) return -1;
      return 1;
    }
    if (!aIsPast && !bIsPast) {
      if (isBefore(dateB, dateA)) return 1;
      return -1;
    }

    if (bIsPast) return -1;
    return 1;
  };

  if (!events.length) return null;

  return (
    <Section id="events">
      <Container>
        <Heading subheading={subheading} showLine>
          {heading}
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

export default EventsSection;
