import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import Fade from "react-reveal/Fade";
import Section from "components/Section";
import Gallery from "components/Gallery";
import Image from "components/Image";

const Products = ({ products }) => {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  const ImageWrapper = ({ className }) => {
    return (
      <div className={className}>
        <Fade duration={200} key={index}>
          <Image
            alt="Featured product"
            className={classes.image}
            src={products[index].image || ""}
            width="400"
          />
        </Fade>
      </div>
    );
  };

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
          href={products[index].link || ""}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={classes.featured}>
            <ImageWrapper className={classes.leftSide} />
            <Card className={classes.rightSide}>
              <Fade bottom duration={300} key={index}>
                <CardHeader
                  title={
                    <Typography variant="h3" gutterBottom>
                      {products[index].title}
                    </Typography>
                  }
                  subheader={
                    <div className={classes.subheader}>
                      {products[index].subtitle}
                    </div>
                  }
                />
                <CardContent className={classes.content}>
                  <Image
                    alt="Featured Product"
                    className={classes.insideImage}
                  />
                  <Typography variant="body1" className={classes.paragraph}>
                    {products[index].description}
                  </Typography>
                </CardContent>
              </Fade>
            </Card>
          </div>
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
}));
