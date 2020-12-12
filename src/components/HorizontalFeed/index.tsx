import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import useResizeAware from "react-resize-aware";

type HorizontalFeedProps = {
  items?: React.ReactNodeArray;
};

type DragDataType = {
  mouseX: number;
  scrollLeft: number;
};

const HorizontalFeed: React.FC<HorizontalFeedProps> = ({ items = [] }) => {
  const [resizeListener, sizes] = useResizeAware();
  const [position, setPosition] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const dragData = React.useRef<DragDataType>(null);

  const { itemWidth, itemHeight, itemPadding } = React.useMemo(() => {
    const { width: containerWidth } = sizes;
    let width;
    if (containerWidth > 800) width = 300;
    else if (containerWidth > 400) width = 250;
    else width = containerWidth / 1.2;
    return {
      itemWidth: width,
      itemHeight: width * 1.2,
      itemPadding: 10,
    };
  }, [sizes]);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dragData.current = {
      mouseX: e.clientX,
      scrollLeft: e.currentTarget.scrollLeft,
    };
    e.currentTarget.style.cursor = "grabbing";
    e.currentTarget.style.userSelect = "none";
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!dragData.current) return;
    const { mouseX, scrollLeft } = dragData.current;
    const deltaX = e.clientX - mouseX;
    e.currentTarget.scrollLeft = scrollLeft - deltaX;
  };

  const onDragEnd = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!dragData.current) return;
    const { mouseX, scrollLeft } = dragData.current;
    const deltaX = e.clientX - mouseX;

    const actualValue = scrollLeft - deltaX;
    e.currentTarget.scrollLeft = actualValue;

    const gridValue = Math.round(actualValue / itemWidth) * itemWidth;
    e.currentTarget.scrollTo({
      left: gridValue,
      behavior: "smooth",
    });
  };

  const classes = useStyles({
    numberOfEvents: items.length,
    position,
    itemWidth,
    itemHeight,
    itemPadding,
    showPrevious: position > 0,
    showNext: true,
    // showNext: items.length - (numberOfItemsShown + position) > 0,
  })();

  return (
    <div className={classes.container}>
      <div
        className={classes.scrollContainer}
        draggable
        ref={scrollRef}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        <div className={classes.scroll}>
          {resizeListener}
          {items.map((item, i) => (
            <div key={i} className={classes.item}>
              {item}
            </div>
          ))}
        </div>
      </div>
      {/* <div className={classes.buttonWrapper}>
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
      </div> */}
    </div>
  );
};

type UseStylesProps = {
  numberOfEvents: number;
  position: number;
  itemWidth: number;
  itemHeight: number;
  itemPadding: number;
  showPrevious: boolean;
  showNext: boolean;
};

const useStyles = ({
  numberOfEvents,
  position,
  itemWidth,
  itemHeight,
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
        overflow: "auto",
        paddingBottom: 10,
      },
      scroll: {
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfEvents}, ${itemWidth}px)`,
        position: "relative",
        // left: `-${position * itemWidth}px`,
        transition: "left 0.5s ease-in-out",
      },
      item: {
        height: itemHeight,
        width: itemWidth,
        padding: `0 ${itemPadding}px`,
      },
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
