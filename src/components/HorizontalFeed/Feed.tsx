import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton, Grid, Container } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { theme } from "components";

import Item from "./Item";

const breakpointKey = "sm";
const breakpoint = theme.breakpoints.values[breakpointKey];

type FeedProps = {
  skeletonHeight: number;
  initialItemWidth: number;
  spacing: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  resizeOnMobile: boolean;
};

const Feed: React.FC<FeedProps> = ({
  children,
  skeletonHeight = 440,
  initialItemWidth = 280,
  spacing: itemSpacingKey = 2,
  resizeOnMobile = true,
}) => {
  const containerRef = React.createRef<HTMLDivElement>();

  const itemSpacing = theme.spacing(itemSpacingKey);

  const [containerSize, setContainerSize] = React.useState(0);
  const [itemWidth, setItemWidth] = React.useState(initialItemWidth);
  const [position, setPosition] = React.useState(0);
  const [showArrowBackground, setShowArrowBackground] = React.useState(true);

  const classes = useStyles({
    gridOffset: position * (itemWidth + itemSpacing),
    showArrowBackground,
  })();

  React.useEffect(() => {
    if (children && containerRef.current) {
      onResize();
      if (window) window.addEventListener("resize", onResize);
    }
  }, [children, containerRef]);

  React.useEffect(() => {
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function isRightArrowVisible() {
    if (!children) return false;

    const innerSize = containerSize;
    const numberOfItems = children ? children.length : 0;
    const spacingTotal = itemSpacing * 2 * (numberOfItems - 1);

    return innerSize < itemWidth * (numberOfItems + position) + spacingTotal;
  }

  function onResize() {
    if (!containerRef.current) return;

    const width = containerRef.current.offsetWidth;
    setContainerSize(width);

    if (width < breakpoint) {
      if (resizeOnMobile) setItemWidth(width - itemSpacing);
      setShowArrowBackground(false);
    } else {
      setItemWidth(initialItemWidth);
      setShowArrowBackground(true);
    }
  }

  function scrollClick(value: number) {
    setPosition(position + value);
  }

  function renderSkeletons() {
    if (!window) return null;

    const skeletonCount = Math.ceil(
      window.innerWidth / (itemWidth + itemSpacing)
    );

    const result = [];
    for (let i = 0; i < skeletonCount; i++) {
      result.push(
        <Grid item key={i}>
          <Skeleton
            variant="rect"
            width={initialItemWidth}
            height={skeletonHeight}
          />
        </Grid>
      );
    }
    return result;
  }

  return (
    <div className={classes.root} ref={containerRef}>
      <Box className={classes.boxContainer}>
        <Grid
          container
          spacing={itemSpacingKey}
          className={classes.gridContainer}
        >
          {children
            ? children.map((child: React.ReactNode, i: number) => {
                return (
                  <Item key={i} delay={i * 100} itemWidth={itemWidth}>
                    {child}
                  </Item>
                );
              })
            : renderSkeletons()}
        </Grid>
        {position ? (
          <IconButton
            className={classes.leftArrowButton}
            onClick={() => scrollClick(1)}
          >
            <ArrowBackIosIcon viewBox="0 0 15 24" />
          </IconButton>
        ) : null}
        {isRightArrowVisible() ? (
          <IconButton
            className={classes.rightArrowButton}
            onClick={() => scrollClick(-1)}
          >
            <ArrowForwardIosIcon viewBox="0 0 20 24" />
          </IconButton>
        ) : null}
      </Box>
    </div>
  );
};

export default Feed;

type UseStylesProps = {
  gridOffset: number;
  showArrowBackground: boolean;
};

const useStyles = ({ gridOffset, showArrowBackground }: UseStylesProps) => {
  return makeStyles((theme) => {
    const commonArrowStyles = {
      position: "absolute",
      padding: 0,
      top: 0,
      height: "100%",
      width: showArrowBackground ? 100 : 50,
      borderRadius: 0,
      "&:hover": {
        background: "transparent",
      },
      [theme.breakpoints.down("md")]: {
        "& .MuiIconButton-label": {
          background: "#3c3c3cad",
          height: 50,
          width: 50,
          borderRadius: "50%",
        },
        "& svg": {
          fill: "white",
        },
      },
    } as const;

    return {
      root: {
        overflow: "hidden",
      },
      header: {
        flexGrow: 1,
      },
      boxContainer: {
        overflow: "hidden",
        position: "relative",
      },
      gridContainer: {
        position: "relative",
        left: gridOffset || 0,
        flexWrap: "nowrap",
        height: "100%",
        padding: 0,
        margin: 0,
        transition: "left 0.3s",
      },
      leftArrowButton: {
        ...commonArrowStyles,
        left: 0,
        boxShadow: showArrowBackground
          ? "inset 102px 0px 38px -24px rgba(255,255,255,1)"
          : "none",
        "&:hover": {
          background: "transparent",
        },
      },
      rightArrowButton: {
        ...commonArrowStyles,
        right: 0,
        boxShadow: showArrowBackground
          ? "inset -102px 0px 38px -24px rgba(255,255,255,1)"
          : "none",
      },
    };
  });
};
