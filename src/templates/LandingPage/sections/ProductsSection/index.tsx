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
import LazyLoad from "react-lazyload";
import { Section, Gallery, Image, Heading } from "components";
import { ProductsSection as ProductsSectionProps } from "types";
import ProductImage from "./ProductImage";

const ProductsSection: React.FC<ProductsSectionProps> = ({
  heading,
  subheading,
  products,
}) => {
  const classes = useStyles();
  const [activeindex, setActiveIndex] = React.useState(0);

  if (!products) return null;

  return (
    <Section>
      <Container>
        <Heading subheading={subheading} showLine>
          {heading}
        </Heading>
        <a
          href={products[activeindex].link || ""}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={classes.featured}>
            <div className={classes.leftSide}>
              <ProductImage
                src={products[activeindex].image}
                alt={products[activeindex].title}
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
                  <LazyLoad height="100%" once>
                    <Image
                      alt="Featured Product"
                      className={classes.insideImage}
                      src={products[activeindex].image}
                      width="auto"
                    />
                  </LazyLoad>
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

export default ProductsSection;

const useStyles = makeStyles((theme) => ({
  featured: {
    display: "grid",
    "grid-template-columns": "1fr 1fr",
    "grid-column-gap": 25,
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
