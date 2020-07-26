import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import Section from "components/Section";
import Link from "components/Link";
import Gallery from "components/Gallery";

const Products = ({ products }) => {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  return (
    <Section>
      <Container>
        <Typography variant="h2">Products</Typography>
        <Typography variant="subtitle1" component="p">
          From books to apps, use these resources to assist you in your journey
        </Typography>
        <Link to={products && products[index].link}>
          <Grid container className={classes.featured}>
            <Grid item xs={4} className={classes.imageWrapper}>
              <Fade duration={200} key={index}>
                <img
                  src={products && products[index].image}
                  className={classes.image}
                />
              </Fade>
            </Grid>
            <Grid item xs={6} className={classes.rightSide}>
              <Fade bottom duration={300} key={index}>
                <Typography variant="h3">
                  {products && products[index].title}
                </Typography>
                <Typography variant="body1">
                  {products && products[index].description}
                </Typography>
              </Fade>
            </Grid>
          </Grid>
        </Link>
        <Gallery items={products} index={index} setIndex={setIndex} />
      </Container>
    </Section>
  );
};

export default Products;

const useStyles = makeStyles((theme) => ({
  featured: {
    justifyContent: "space-between",
  },
  imageWrapper: {
    height: 400,
    flexBasis: 400,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  rightSide: {
    padding: theme.spacing(4),
    boxShadow: "0px 0px 31px -3px rgba(0,0,0,0.24)",
    overflow: "hidden",
  },
}));
