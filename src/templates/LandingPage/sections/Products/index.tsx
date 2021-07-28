import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { Section, Gallery, Image } from "components";
import { Product } from "types";

type ProductsProps = {
  products: Product[];
};

const Products: React.FC<ProductsProps> = ({ products }) => {
  const classes = useStyles();
  const [activeindex, setActiveIndex] = React.useState(0);

  if (!products) return null;

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
          href={products[activeindex].link || ""}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={classes.featured}>
            <div className={classes.leftSide}>
              <Image
                alt="Featured product"
                className={classes.image}
                src={products[activeindex].image}
                width="auto"
              />
            </div>
            <Card className={classes.rightSide}>
              <Fade bottom duration={300} key={activeindex}>
                <CardHeader
                  title={
                    <Typography variant="h3" gutterBottom>
                      {products[activeindex].title}
                    </Typography>
                  }
                  subheader={<div>{products[activeindex].subtitle}</div>}
                />
                <CardContent className={classes.content}>
                  <Image
                    alt="Featured Product"
                    className={classes.insideImage}
                    src={products[activeindex].image}
                    width="auto"
                  />
                  <Typography variant="body1" className={classes.paragraph}>
                    {products[activeindex].description}
                  </Typography>
                </CardContent>
              </Fade>
            </Card>
          </div>
        </a>
        <Gallery
          images={products.map(({ image }) => image)}
          setActiveIndex={setActiveIndex}
          activeIndex={activeindex}
        />
      </Container>
    </Section>
  );
};

export default Products;

const useStyles = makeStyles((theme) => ({
  featured: {
    display: "grid",
    "grid-template-columns": "1fr 1fr",
    [theme.breakpoints.down("sm")]: {
      "grid-template-columns": "1fr",
    },
  },
  leftSide: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    display: "flex",
    justifyContent: "center",
    "& img": {
      height: 500,
      maxWidth: 400,
    },
  },
  image: {
    width: "100%",
    objectFit: "contain",
  },
  rightSide: {
    boxShadow: "0px 0px 31px -3px rgba(0,0,0,0.24)",
    height: 500,
    overflow: "auto",
  },
  content: {
    [theme.breakpoints.down("sm")]: {
      display: "grid",
      "grid-template-columns": "200px 1fr",
      "grid-column-gap": 15,
    },
    [theme.breakpoints.down("xs")]: {
      "grid-template-columns": "1fr",
    },
  },
  insideImage: {
    width: "100%",
    objectFit: "contain",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  paragraph: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  galleryItem: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    border: `10px solid transparent`,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "all 0.5s",
    },
  },
  activeGalleryItem: {
    border: `10px solid ${theme.palette.primary.light}`,
    "& img": {
      transform: "scale(1.1)",
    },
  },
}));
