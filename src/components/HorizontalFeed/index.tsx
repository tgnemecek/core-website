import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import useResizeAware from "react-resize-aware";
import { useBreakpoint } from "utils";

type HorizontalFeedProps = {
  items?: React.ReactNodeArray;
};

const HorizontalFeed: React.FC<HorizontalFeedProps> = ({ items = [] }) => {
  const [resizeListener, sizes] = useResizeAware();
  const { sm, md } = useBreakpoint();
  const [initialScroll, setInitialScroll] = React.useState(null);
  const [showPrevious, setShowPrevious] = React.useState(false);
  const [showNext, setShowNext] = React.useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const canScroll = Boolean(initialScroll !== null);

  const scrollAmount = md ? 3 : 1;

  const { itemWidth, itemHeight, itemPadding } = React.useMemo(() => {
    const { width: containerWidth } = sizes;
    let width;

    if (md) width = containerWidth / 3;
    else width = containerWidth - 60;

    const minHeight = 200;
    const maxHeight = 400;

    const height = Math.min(Math.max(width, minHeight), maxHeight);

    return {
      itemWidth: width,
      itemHeight: height,
      itemPadding: 10,
    };
  }, [sizes, md]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setInitialScroll(e.currentTarget.scrollLeft);
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    let gridValue;

    if (
      initialScroll <= e.currentTarget.scrollLeft &&
      e.currentTarget.scrollLeft
    ) {
      gridValue = Math.ceil(e.currentTarget.scrollLeft / itemWidth);
    } else {
      gridValue = Math.floor(e.currentTarget.scrollLeft / itemWidth);
    }

    gridValue = gridValue * itemWidth;

    e.currentTarget.scrollTo({
      left: gridValue,
      behavior: "smooth",
    });

    setInitialScroll(null);
  };

  const onScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, scroll } = scrollRef.current;

    if (!scrollLeft) {
      setShowPrevious(false);
      setShowNext(true);
    } else {
      setShowPrevious(true);

      const scrollPos = Math.round((scrollLeft + sizes.width) / 10);
      const roundedWith = Math.round(scrollWidth / 10);

      if (scrollPos === roundedWith) {
        setShowNext(false);
      }
    }
  };

  const handleClick = (type: "previous" | "next") => {
    if (!scrollRef.current) return;

    let targetScroll = scrollRef.current.scrollLeft;
    const amount = itemWidth * scrollAmount;

    if (type === "previous") targetScroll -= amount;
    else targetScroll += amount;

    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const classes = useStyles({
    numberOfItems: items.length,
    itemWidth,
    itemHeight,
    itemPadding,
    canScroll,
    showPrevious,
    showNext,
  })();

  return (
    <div className={classes.container}>
      {sm && (
        <div>
          <IconButton
            onClick={() => handleClick("previous")}
            className={classes.previousButton}
          >
            <ArrowBackIosRoundedIcon />
          </IconButton>
        </div>
      )}
      <div
        className={classes.scrollContainer}
        draggable
        ref={scrollRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onScroll={onScroll}
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
      <div>
        {sm && (
          <IconButton
            onClick={() => handleClick("next")}
            className={classes.nextButton}
          >
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

type UseStylesProps = {
  numberOfItems: number;
  itemWidth: number;
  itemHeight: number;
  itemPadding: number;
  canScroll: boolean;
  showPrevious: boolean;
  showNext: boolean;
};

const useStyles = ({
  numberOfItems,
  itemWidth,
  itemHeight,
  itemPadding,
  canScroll,
  showPrevious,
  showNext,
}: UseStylesProps) =>
  makeStyles((theme) => {
    const button = (show: boolean) =>
      ({
        "&, &:focus, &:active": {
          backgroundColor: "white",
        },
        pointerEvents: show ? "all" : "none",
        opacity: show ? 0.95 : 0,
        transition: "opacity 0.8s",
      } as const);

    return {
      container: {
        display: "flex",
        alignItems: "center",
      },
      scrollContainer: {
        overflow: canScroll ? "auto" : "hidden",
        paddingBottom: 10,
        width: "100%",
      },
      scroll: {
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfItems}, ${itemWidth}px)`,
        position: "relative",
      },
      item: {
        height: itemHeight,
        width: itemWidth,
        padding: `0 ${itemPadding}px`,
      },
      previousButton: button(showPrevious),
      nextButton: button(showNext),
    };
  });

export default HorizontalFeed;
