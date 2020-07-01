import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, IconButton } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

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
  const [testimonials, setTestimonials] = React.useState(null);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      const data = TEMP_DATA; // fetch function here

      // Shuffle array
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = data[i];
        data[i] = data[j];
        data[j] = temp;
      }

      setTestimonials(data);
    }, 1000);
  }, []);

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
        <Typography variant="h2">Testimonials</Typography>
        <Grid container className={classes.testimonialWrapper}>
          <Grid item>
            <IconButton onClick={() => changeIndex(-1)}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid item className={classes.testimonial}>
            {testimonials ? (
              <>
                <Typography variant="body1">
                  {testimonials[index].text}
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
  },
  testimonial: {
    flexGrow: 1,
    textAlign: "center",
    maxWidth: "inherit",
  },
}));
