import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link, graphql } from "gatsby";
import { Container, Typography, Grid } from "@material-ui/core";

import Section from "components/Section";

const Explanation = ({ explanation }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={5}
        className={classes.gridContainer}
        alignItems="center"
      >
        <Grid item xs={8}>
          <Typography variant="body1" align="center">
            {explanation}
          </Typography>
        </Grid>
        <Grid item xs={4} className={classes.imgContainer}>
          <img
            src="https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
            className={classes.image}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

Explanation.prototypes = {
  explanation: PropTypes.string.isRequired,
};

export default Explanation;

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: "400px",
  },
  imgContainer: {
    alignSelf: "stretch",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    boxShadow: theme.shadows[2],
  },
}));
