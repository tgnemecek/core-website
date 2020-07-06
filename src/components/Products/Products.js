import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Link from "src/components/Link/Link";

import Gallery from "src/components/Gallery/Gallery";

const TEMP_DATA = [
  {
    title: "SOS: Switch Off Stress",
    description:
      "Natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus",
    url: "http://www.google.com",
    image:
      "https://i2.wp.com/thebestbrainpossible.com/wp-content/uploads/2019/11/Untitled-design-17.png?ssl=1",
  },
  {
    title: "Classes",
    description:
      "Ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus",
    url: "http://www.google.com",
    image:
      "https://s31450.pcdn.co/wp-content/uploads/2019/11/Implementing-active-learning-and-student-centered-pedagogy.jpg",
  },
];

const Products = (props) => {
  const classes = useStyles();
  const [products, setProducts] = React.useState(null);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    // Fetch
    setTimeout(() => {
      const data = TEMP_DATA;
      setProducts(data);
    }, 200);
  }, []);

  return (
    <section className={classes.products}>
      <Container>
        <Typography variant="h2">Products</Typography>
        <Link to={products && products[index].url}>
          <Grid container className={classes.featured}>
            <Grid item xs={4}>
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
    height: 400,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));
