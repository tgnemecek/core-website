import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "components/theme";
import { Box, IconButton, Grid, Container } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Item from "./Item";

const breakpointKey = "sm";
const breakpoint = theme.breakpoints.values[breakpointKey];

export default function Feed({
  children,
  skeletonHeight = 440,
  initialItemWidth = 280,
  spacing: itemSpacingKey = 2,
}) {
  const containerRef = React.createRef();

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
    if (children) {
      onResize();
      if (window) window.addEventListener("resize", onResize);
    }
  }, [children, containerRef]);

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
      setItemWidth(width - itemSpacing);
      setShowArrowBackground(false);
    } else {
      setItemWidth(initialItemWidth);
      setShowArrowBackground(true);
    }
  }

  function scrollClick(value) {
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
            ? children.map((child, i) => {
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
            <ArrowBackIosIcon />
          </IconButton>
        ) : null}
        {isRightArrowVisible() ? (
          <IconButton
            className={classes.rightArrowButton}
            onClick={() => scrollClick(-1)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        ) : null}
      </Box>
    </div>
  );
}

const useStyles = ({ gridOffset, showArrowBackground }) =>
  makeStyles((theme) => ({
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
      position: "absolute",
      padding: 0,
      top: 0,
      left: 0,
      height: "100%",
      width: showArrowBackground ? 100 : 50,
      borderRadius: 0,
      boxShadow: showArrowBackground
        ? "inset 102px 0px 38px -24px rgba(255,255,255,1)"
        : "none",
      "&:hover": {
        background: "transparent",
      },
    },
    rightArrowButton: {
      position: "absolute",
      padding: 0,
      top: 0,
      right: 0,
      height: "100%",
      width: showArrowBackground ? 100 : 50,
      borderRadius: 0,
      boxShadow: showArrowBackground
        ? "inset -102px 0px 38px -24px rgba(255,255,255,1)"
        : "none",
      "&:hover": {
        background: "transparent",
      },
    },
  }));
