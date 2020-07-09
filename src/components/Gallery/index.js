import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Link from "components/Link";

const Gallery = ({ items, index, setIndex }) => {
  const classes = useStyles();

  const gridItemClass = (i) => {
    let className = classes.gridItem;
    if (i === index) {
      className += ` ${classes.chosenItem}`;
    }
    return className;
  };

  return (
    <Grid container className={classes.gallery}>
      {items
        ? items.map(({ image }, i) => {
            return (
              <Grid
                item
                key={i}
                xs={2}
                onMouseEnter={() => setIndex(i)}
                className={gridItemClass(i)}
              >
                <img src={image} className={classes.image} />
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

Gallery.PropTypes = {
  items: PropTypes.any,
  index: PropTypes.any,
  setIndex: PropTypes.any,
};

export default Gallery;

const useStyles = makeStyles((theme) => ({
  gallery: {
    backgroundColor: theme.palette.grey["300"],
    marginTop: theme.spacing(3),
  },
  gridItem: {
    height: 120,
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
