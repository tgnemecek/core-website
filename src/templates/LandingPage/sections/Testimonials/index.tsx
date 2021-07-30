import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Section, Heading, theme } from "components";
import { shuffleArray } from "utils";
import { Testimonial } from "types";
import TestimonialItem from "./TestimonialItem";

type TestimonialsProps = {
  testimonials: Testimonial[];
};

const Testimonials: React.FC<TestimonialsProps> = (props) => {
  const classes = useStyles();
  const testimonials = shuffleArray(props.testimonials) as Testimonial[];
  const [index, setIndex] = React.useState(0);

  const changeIndex = (value: number) => {
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
    <Section backgroundColor={theme.palette.primary.main} small={true}>
      <Container>
        <Heading hidden>Testimonials</Heading>
        <Grid container className={classes.testimonialWrapper}>
          <Grid item>
            <IconButton onClick={() => changeIndex(-1)}>
              <ArrowBackIosIcon className={classes.arrow} />
            </IconButton>
          </Grid>
          <Grid item className={classes.testimonial}>
            {testimonials && (
              <TestimonialItem key={index} {...testimonials[index]} />
            )}
          </Grid>
          <Grid item>
            <IconButton onClick={() => changeIndex(1)}>
              <ArrowForwardIosIcon className={classes.arrow} />
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
  arrow: {
    color: theme.palette.common.white,
  },
  testimonial: {
    flexGrow: 1,
    textAlign: "center",
    maxWidth: "inherit",
  },
}));
