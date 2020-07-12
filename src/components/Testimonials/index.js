import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, IconButton } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import VisuallyHidden from "@reach/visually-hidden";
import { shuffleArray } from "src/util";

const TEMP_DATA = [
  {
    text:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus",
    author: "Thiago Nemecek",
    role: "Web Developer",
  },
  {
    text:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda",
    author: "James Gustav",
    role: "CEO",
  },
  {
    text:
      "Minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus",
    author: "Bob Edward",
    role: "Artist",
  },
  {
    text:
      "Vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda",
    author: "Paul Henry",
    role: "Vice President of Big Corporation",
  },
];

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
    <section>
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
            {testimonials ? (
              <>
                <Typography variant="body2" className={classes.text}>
                  {testimonials[index].testimonial}
                </Typography>
                <Typography variant="subtitle1">{`—${testimonials[index].author}, ${testimonials[index].role}`}</Typography>
              </>
            ) : (
              <Skeleton />
            )}
          </Grid>
          <Grid item>
            <IconButton onClick={() => changeIndex(1)}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Testimonials;

const useStyles = makeStyles((theme) => ({
  testimonialWrapper: {
    flexWrap: "nowrap",
    alignItems: "center",
    height: 500,
  },
  text: {
    fontStyle: "italic",
  },
  testimonial: {
    flexGrow: 1,
    textAlign: "center",
    maxWidth: "inherit",
  },
}));
