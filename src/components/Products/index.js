import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";

import Link from "components/Link";
import Gallery from "components/Gallery";

const Products = ({ products }) => {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  return (
    <section className={classes.products}>
      <Container>
        <Typography variant="h2">Products</Typography>
        <Link to={products && products[index].link}>
          <Grid container className={classes.featured}>
            <Grid item xs={4} className={classes.imageWrapper}>
              <img
                src={products && products[index].image}
                className={classes.image}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h3">
                {products && products[index].title}
              </Typography>
              <Typography variant="body1">
                {products && products[index].description}
              </Typography>
            </Grid>
          </Grid>
        </Link>
        <Gallery items={products} index={index} setIndex={setIndex} />
      </Container>
    </section>
  );
};

export default Products;

const useStyles = makeStyles((theme) => ({
  products: {
    marginBottom: theme.spacing(8),
  },
  featured: {
    justifyContent: "space-between",
  },
  imageWrapper: {
    height: 400,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));
