import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import Section from "components/Section";
import Gallery from "components/Gallery";

const Products = ({ products }) => {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  return (
    <Section>
      <Container>
        <Typography variant="h2">
          Leading Your Life &amp; Work Products
        </Typography>
        <Typography variant="subtitle1" component="p">
          From books to apps, use these resources to assist you in your journey
        </Typography>
        <a
          href={products ? products[index].link : ""}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Grid container className={classes.featured} spacing={3}>
            <Grid item xs={12} md={5} className={classes.leftSide}>
              <Fade duration={200} key={index}>
                <img
                  src={products && products[index].image}
                  className={classes.image}
                />
              </Fade>
            </Grid>
            <Grid item xs={12} md={7} className={classes.rightSide}>
              <Fade bottom duration={300} key={index}>
                <div className={classes.textContainer}>
                  <Typography variant="h3">
                    {products && products[index].title}
                  </Typography>
                  <Typography variant="body1">
                    {products && products[index].description}
                  </Typography>
                </div>
              </Fade>
            </Grid>
          </Grid>
        </a>
        <Gallery
          items={products}
          index={index}
          setIndex={setIndex}
          height={300}
          width={200}
        />
      </Container>
    </Section>
  );
};

export default Products;

const useStyles = makeStyles((theme) => ({
  featured: {
    padding: `0 10%`,
    height: 500,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      padding: 0,
    },
  },
  leftSide: {
    backgroundColor: "white",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      height: 200,
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  rightSide: {
    boxShadow: "0px 0px 31px -3px rgba(0,0,0,0.24)",
  },
  textContainer: {
    padding: theme.spacing(3),
    overflow: "auto",
    height: "100%",
  },
}));
