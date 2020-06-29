import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
const itemHeight = 280;
const breakpoint = 600;

export default function HorizontalFeed(props) {
  const containerRef = React.createRef();

  const [containerSize, setContainerSize] = React.useState(0);
  const [itemWidth, setItemWidth] = React.useState(initialItemWidth);
  const [position, setPosition] = React.useState(0);

  const classes = useStyles({ itemWidth, gridOffset: position * itemWidth })();

  React.useEffect(() => {
    if (props.items) {
      onResize();
      window.addEventListener("resize", onResize);
    }
  }, [props.items, containerRef]);

  function isRightArrowVisible() {
    const numberOfItems = props.items ? props.items.length : 0;
    return containerSize < itemWidth * (numberOfItems + position);
  }

  function onResize() {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    setContainerSize(width);
    if (width < breakpoint) {
      setItemWidth(width);
    } else setItemWidth(initialItemWidth);
  }

  function scrollClick(value) {
    setPosition(position + value);
  }

  return (
    <Container className={classes.root} ref={containerRef}>
      <Box className={classes.boxContainer}>
        <Grid container spacing={2} className={classes.gridContainer}>
          {!props.items ? (
            <>
              <Grid item>
                <Skeleton
                  variant="rect"
                  width={initialItemWidth}
                  height={initialItemWidth}
                />
              </Grid>
              <Grid item>
                <Skeleton
                  variant="rect"
                  width={initialItemWidth}
                  height={initialItemWidth}
                />
              </Grid>
              <Grid item>
                <Skeleton
                  variant="rect"
                  width={initialItemWidth}
                  height={initialItemWidth}
                />
              </Grid>
            </>
          ) : (
            props.items.map((item, i) => {
              return (
                <Item
                  key={i}
                  {...item}
                  itemWidth={itemWidth}
                  itemHeight={itemHeight}
                />
              );
            })
          )}
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

const useStyles = ({ itemWidth, gridOffset }) =>
  makeStyles((theme) => ({
    root: {
      overflow: "hidden",
      marginBottom: theme.spacing(5),
    },
    header: {
      flexGrow: 1,
    },
    boxContainer: {
      overflow: "hidden",
      position: "relative",
      marginTop: theme.spacing(3),
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
      width: 100,
      borderRadius: 0,
      boxShadow: "inset 102px 0px 38px -24px rgba(255,255,255,1)",
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
      width: 100,
      borderRadius: 0,
      boxShadow: "inset -102px 0px 38px -24px rgba(255,255,255,1)",
      "&:hover": {
        background: "transparent",
      },
    },
    [theme.breakpoints.down("xs")]: {
      root: {
        width: "100%",
      },
      leftArrowButton: {
        width: 50,
        boxShadow: "none",
      },
      rightArrowButton: {
        width: 50,
        boxShadow: "none",
      },
    },
  }));
