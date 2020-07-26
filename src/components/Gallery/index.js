import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { theme } from "components/theme";
import HorizontalFeed from "components/HorizontalFeed";

const baseHeight = 160;
const baseWidth = 160;

const Gallery = ({ items, index, setIndex }) => {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ mobile })();

  const gridItemClass = (i) => {
    let className = classes.gridItem;
    if (i === index) {
      className += ` ${classes.chosenItem}`;
    }
    return className;
  };

  return (
    <div className={classes.gallery}>
      <HorizontalFeed initialItemWidth={baseWidth} spacing={0}>
        {items &&
          items.map(({ image }, i) => {
            return (
              <div
                key={i}
                onMouseEnter={() => setIndex(i)}
                className={gridItemClass(i)}
              >
                <img src={image} className={classes.image} />
              </div>
            );
          })}
      </HorizontalFeed>
    </div>
  );

  // return (
  //   <Grid container className={classes.gallery}>
  //     {items
  //       ? items.map(({ image }, i) => {
  //           return (
  //             <Grid
  //               item
  //               key={i}
  //               xs={mobile ? 3 : 2}
  //               onMouseEnter={() => setIndex(i)}
  //               className={gridItemClass(i)}
  //             >
  //               <img src={image} className={classes.image} />
  //             </Grid>
  //           );
  //         })
  //       : null}
  //   </Grid>
  // );
};

Gallery.propTypes = {
  items: PropTypes.any,
  index: PropTypes.any,
  setIndex: PropTypes.any,
};

export default Gallery;

const useStyles = ({ mobile }) =>
  makeStyles((theme) => ({
    gallery: {
      backgroundColor: theme.palette.grey["300"],
      marginTop: theme.spacing(3),
      overflow: "hidden",
      flexWrap: "nowrap",
    },
    gridItem: {
      height: mobile ? baseHeight * 2 : baseHeight,
      flexShrink: 0,
      overflow: "hidden",
      transition: "border 0.1s",
    },
    chosenItem: {
      border: `6px solid ${theme.palette.info.light}`,
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  }));
