import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";

const Explanation = ({ explanation: { text, image } }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={5}
        className={classes.gridContainer}
        alignItems="center"
      >
        <Grid item xs={12} md={8}>
          <Typography variant="body1" align="center">
            {text}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} className={classes.imgContainer}>
          <img src={image} className={classes.image} />
        </Grid>
      </Grid>
    </Container>
  );
};

Explanation.prototypes = {
  explanation: PropTypes.exact({
    text: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default Explanation;

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    minHeight: "400px",
  },
  imgContainer: {
    alignSelf: "stretch",
    maxHeight: "400px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    boxShadow: theme.shadows[2],
  },
}));
