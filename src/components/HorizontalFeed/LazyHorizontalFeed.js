import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "components/theme";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Container,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Item from "./Item";

const initialItemWidth = 280;
const itemHeight = 380;
const itemSpacingKey = 2;
const itemSpacing = theme.spacing(itemSpacingKey);
const breakpointKey = "sm";
const breakpoint = theme.breakpoints.values[breakpointKey];
const wrapperHorPadding = theme.spacing(3);

export default function LazyHorizontalFeed(props) {
  const containerRef = React.createRef();

  const [containerSize, setContainerSize] = React.useState(0);
  const [itemWidth, setItemWidth] = React.useState(initialItemWidth);
  const [position, setPosition] = React.useState(0);
  const [showArrowBackground, setShowArrowBackground] = React.useState(true);

  const classes = useStyles({
    itemWidth,
    gridOffset: position * (itemWidth + itemSpacing),
    showArrowBackground,
  })();

  React.useEffect(() => {
    if (props.items) {
      onResize();
      if (window) window.addEventListener("resize", onResize);
    }
  }, [props.items, containerRef]);

  function isRightArrowVisible() {
    if (!props.items) return false;

    const innerSize = containerSize - 2 * wrapperHorPadding;
    const numberOfItems = props.items ? props.items.length : 0;
    const spacingTotal = itemSpacing * 2 * (numberOfItems - 1);

    return innerSize < itemWidth * (numberOfItems + position) + spacingTotal;
  }

  function onResize() {
    if (!containerRef.current) return;

    const width = containerRef.current.offsetWidth;
    setContainerSize(width);

    if (width < breakpoint) {
      setItemWidth(width - itemSpacing - wrapperHorPadding * 2);
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
            height={itemHeight}
          />
        </Grid>
      );
    }
    return result;
  }

  return (
    <Container className={classes.root} ref={containerRef}>
      <Box className={classes.boxContainer}>
        <Grid
          container
          spacing={itemSpacingKey}
          className={classes.gridContainer}
        >
          {!props.items
            ? renderSkeletons()
            : props.items.map((item, i) => {
                return (
                  <Item
                    key={i}
                    delay={i * 100}
                    {...item}
                    itemWidth={itemWidth}
                    itemHeight={itemHeight}
                  />
                );
              })}
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
    </Container>
  );
}

const useStyles = ({ itemWidth, gridOffset, showArrowBackground }) =>
  makeStyles((theme) => ({
    root: {
      overflow: "hidden",
      padding: `0 ${wrapperHorPadding}px`,
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
