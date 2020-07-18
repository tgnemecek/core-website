import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, IconButton } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import VisuallyHidden from "@reach/visually-hidden";
import Section from "components/Section";
import { shuffleArray } from "src/util";

import Testimonial from "./Testimonial";

const Testimonials = (props) => {
  const classes = useStyles();
  const [testimonials, setTestimonials] = React.useState(
    shuffleArray(props.testimonials)
  );
  const [index, setIndex] = React.useState(0);

  const changeIndex = (value) => {
    let newIndex = index + value;
    const lastIndex = testimonials.length - 1;
    if (newIndex < 0) {
      newIndex = lastIndex;
    } else if (newIndex > lastIndex) {
      newIndex = 0;
    }
    setIndex(newIndex);
  };

  return (
    <Section backgroundColor="primary.main" small={true}>
      <Container>
        <VisuallyHidden>
          <Typography variant="h2">Testimonials</Typography>
        </VisuallyHidden>
        <Grid container className={classes.testimonialWrapper}>
          <Grid item>
            <IconButton onClick={() => changeIndex(-1)}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid item className={classes.testimonial}>
            {testimonials && (
              <Testimonial key={index} {...testimonials[index]} />
            )}
          </Grid>
          <Grid item>
            <IconButton onClick={() => changeIndex(1)}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
};

export default Testimonials;

const useStyles = makeStyles((theme) => ({
  testimonialWrapper: {
    flexWrap: "nowrap",
    alignItems: "center",
    height: 500,
  },
  testimonial: {
    flexGrow: 1,
    textAlign: "center",
    maxWidth: "inherit",
  },
}));
