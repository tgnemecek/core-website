import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import useResizeAware from "react-resize-aware";
import { Section, HorizontalFeed } from "components";
import { useEventFeed } from "utils";
import { EventFeedType } from "types";
import Event from "./Event";

const skeletonHeight = 440;

type EventFeedProps = {
  title: string;
  filter?: (event: EventFeedType) => boolean;
};

// const width = 280;
// const height = 440;
// const padding = 10;

const EventFeed: React.FC<EventFeedProps> = ({ title, filter }) => {
  const events = useEventFeed().filter(filter || Boolean);

  const renderSlides = () => {
    debugger;
    const numberPerPage = 3;
    const result = [];
    for (let i = 0; i < Math.ceil(events.length / numberPerPage); i++) {
      const startingPoint = i * numberPerPage;
      const selected = events.slice(
        startingPoint,
        startingPoint + numberPerPage
      );
      result.push(
        <Slider key={i}>
          {selected.map((event, j) => (
            <Slide
              index={i + j}
              key={j}
              style={{ height, width, padding: `0 ${padding}px` }}
            >
              <Event event={event} />
            </Slide>
          ))}
        </Slider>
      );
    }
    return result;
  };

  return (
    <Section id="events">
      <Container>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="subtitle1" component="p">
          Latest updates about our online and in-person events
        </Typography>
      </Container>
      <Container>
        {/* <HorizontalFeed skeletonHeight={skeletonHeight}>
          {events && events.map((event, i) => <Event key={i} event={event} />)}
        </HorizontalFeed> */}
        {/* <CarouselProvider
          naturalSlideWidth={width}
          naturalSlideHeight={height}
          totalSlides={events.length}
          isIntrinsicHeight
        >
          {renderSlides()}
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </CarouselProvider> */}
        <NewFeed
          items={events.map((event, i) => (
            <Event key={i} event={event} />
          ))}
        />
      </Container>
    </Section>
  );
};

const width = 280;
const height = 440;
const padding = 10;

const NewFeed: React.FC<{ items: React.ReactNodeArray }> = ({ items }) => {
  const [resizeListener, sizes] = useResizeAware();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {resizeListener}
      <div className={classes.scroll}>
        {items.map((item, i) => (
          <div key={i} className={classes.item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {},
  scroll: {
    display: "grid",
    gridTemplateColumns: `repeat(99, ${width}px)`,
    position: "relative",
  },
  item: { height, width, padding: `0 ${padding}px` },
}));

export default EventFeed;
