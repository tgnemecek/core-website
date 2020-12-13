import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import useResizeAware from "react-resize-aware";
import { useBreakpoint } from "utils";
import { Image } from "components";

type GalleryProps = {
  images?: string[];
  setActiveIndex: (activeIndex: number) => void;
  activeIndex: number;
  itemHeight?: number;
};

const Gallery: React.FC<GalleryProps> = ({
  images = [],
  setActiveIndex,
  activeIndex,
  itemHeight: staticHeight,
}) => {
  const [resizeListener, sizes] = useResizeAware();
  const { xs, sm, md } = useBreakpoint();
  const [initialScroll, setInitialScroll] = React.useState(null);
  const [showPrevious, setShowPrevious] = React.useState(false);
  const [showNext, setShowNext] = React.useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const canScroll = Boolean(initialScroll !== null);

  const { itemWidth, itemHeight, itemPadding } = React.useMemo(() => {
    const { width: containerWidth } = sizes;
    let width = 200;
    let height = 300;

    if (containerWidth < 700) height = 200;

    const minHeight = 200;
    const maxHeight = 400;

    height = Math.min(Math.max(height, minHeight), maxHeight);

    return {
      itemWidth: width,
      itemHeight: staticHeight || height,
      itemPadding: 0,
    };
  }, [sizes]);

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
    const { scrollLeft, scrollWidth } = scrollRef.current;

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
    const amount = itemWidth * 3;

    if (type === "previous") targetScroll -= amount;
    else targetScroll += amount;

    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const classes = useStyles({
    numberOfImages: images.length,
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
          {images.map((image, i) => (
            <div
              key={i}
              className={`${classes.item} ${
                activeIndex === i && classes.activeItem
              }`}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <Image src={image} />
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
  numberOfImages: number;
  itemWidth: number;
  itemHeight: number;
  itemPadding: number;
  canScroll: boolean;
  showPrevious: boolean;
  showNext: boolean;
};

const useStyles = ({
  numberOfImages,
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
        "&, &:focus, &:active, &:hover": {
          backgroundColor: "transparent",
        },
        pointerEvents: show ? "all" : "none",
        opacity: show ? 0.95 : 0,
        transition: "opacity 0.8s",
      } as const);

    return {
      container: {
        display: "flex",
        alignItems: "center",
        marginTop: 25,
      },
      scrollContainer: {
        overflow: canScroll ? "auto" : "hidden",
        paddingBottom: 10,
        margin: "auto",
      },
      scroll: {
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfImages}, ${itemWidth}px)`,
        position: "relative",
      },
      item: {
        height: itemHeight,
        width: itemWidth,
        overflow: "hidden",
        border: `10px solid transparent`,
        "& img": {
          height: "100%",
          width: "100%",
          objectFit: "cover",
          transition: "all 0.5s",
        },
      },
      activeItem: {
        border: `10px solid ${theme.palette.primary.light}`,
        "& img": {
          transform: "scale(1.1)",
        },
      },
      previousButton: button(showPrevious),
      nextButton: button(showNext),
    };
  });

export default Gallery;
