import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, IconButton } from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import useResizeAware from "react-resize-aware";
import { Section } from "components";
import { useEventFeed, useBreakpoint } from "utils";
import { EventFeedType } from "types";

type HorizontalFeedProps = {
  items?: React.ReactNodeArray;
  height?: number;
};

const HorizontalFeed: React.FC<HorizontalFeedProps> = ({
  items = [],
  height = 440,
}) => {
  const [resizeListener, sizes] = useResizeAware();
  const [position, setPosition] = React.useState(0);

  const numberOfItemsShown = React.useMemo(() => {
    const { width } = sizes;

    if (width > 1100) return 4;
    if (width > 800) return 3;
    if (width > 700) return 2;
    return 1;
  }, [sizes]);

  const itemWidth = sizes.width / numberOfItemsShown;
  const itemPadding = React.useMemo(() => {
    const { width } = sizes;

    if (width > 800) return 10;
    if (width > 700) return 30;
    if (width > 450) return 80;
    return 10;
  }, [sizes]);

  const classes = useStyles({
    numberOfEvents: items.length,
    position,
    itemWidth,
    height,
    itemPadding,
    showPrevious: position > 0,
    showNext: items.length - (numberOfItemsShown + position) > 0,
  })();

  return (
    <div className={classes.container}>
      <div className={classes.scrollContainer}>
        <div className={classes.scroll} onTouchEnd={(e) => console.log(e)}>
          {resizeListener}
          {items.map((item, i) => (
            <div key={i} className={classes.item}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.buttonWrapper}>
        <IconButton
          onClick={() => setPosition((prev) => prev - 1)}
          className={classes.previousButton}
        >
          <ArrowBackIosRoundedIcon />
        </IconButton>
        <IconButton
          onClick={() => setPosition((prev) => prev + 1)}
          className={classes.nextButton}
        >
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
};

type UseStylesProps = {
  numberOfEvents: number;
  position: number;
  itemWidth: number;
  height: number;
  itemPadding: number;
  showPrevious: boolean;
  showNext: boolean;
};

const useStyles = ({
  numberOfEvents,
  position,
  itemWidth,
  height,
  itemPadding,
  showPrevious,
  showNext,
}: UseStylesProps) =>
  makeStyles((theme) => {
    const button = (show: boolean) =>
      ({
        "&, &:focus, &:active": {
          backgroundColor: "white",
        },
        boxShadow: theme.shadows[10],
        pointerEvents: show ? "all" : "none",
        opacity: show ? 0.95 : 0,
        transition: "opacity 0.8s",
      } as const);

    return {
      container: {
        position: "relative",
      },
      scrollContainer: {
        overflow: "hidden",
        paddingBottom: 10,
      },
      scroll: {
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfEvents}, ${itemWidth}px)`,
        position: "relative",
        left: `-${position * itemWidth}px`,
        transition: "left 0.5s ease-in-out",
      },
      item: { height, width: itemWidth, padding: `0 ${itemPadding}px` },
      buttonWrapper: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      },
      previousButton: button(showPrevious),
      nextButton: button(showNext),
    };
  });

export default HorizontalFeed;
