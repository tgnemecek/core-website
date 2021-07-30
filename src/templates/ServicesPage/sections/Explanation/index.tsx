import React from "react";
import ReactMarkdown from "react-markdown";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { Image, Markdown } from "components";

const imageHeight = 400;

type ExplanationProps = {
  explanation: {
    text: string;
    image: string;
  };
};

const Explanation: React.FC<ExplanationProps> = ({
  explanation: { text, image },
}) => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={5}
        className={classes.gridContainer}
        alignItems="center"
      >
        <Grid item xs={12} md={8}>
          <Markdown
            text={text}
            components={{
              li: ({ children, ...props }) => (
                <ListItem {...props}>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <Typography variant="body1">{children}</Typography>
                </ListItem>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} className={classes.imgContainer}>
          <Image
            alt="About the service provided"
            className={classes.image}
            src={image}
            height={imageHeight}
            gravity="auto"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Explanation;

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    minHeight: "400px",
  },
  imgContainer: {
    margin: "auto",
    alignSelf: "stretch",
    height: imageHeight,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    boxShadow: theme.shadows[2],
  },
}));
