import React from "react";
import PropTypes from "prop-types";
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

const Explanation = ({ explanation: { text, image } }) => {
  const classes = useStyles();

  console.log({ text });

  const preparedText = () => {
    return (
      <ReactMarkdown
        source={text}
        renderers={{
          paragraph: (props) => <Typography {...props} variant="body1" />,
          // text: "span",
          text: (props) => <React.Fragment {...props} />,
          link: (props) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          list: (props) => <List {...props} />,
          listItem: ({ children, ...props }) => (
            <ListItem {...props}>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <Typography variant="body1">{children}</Typography>
            </ListItem>
          ),
          strong: (props) => (
            <strong style={{ fontWeight: "bold" }} {...props} />
          ),
        }}
      />
    );
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={5}
        className={classes.gridContainer}
        alignItems="center"
      >
        <Grid item xs={12} md={8}>
          {preparedText()}
        </Grid>
        <Grid item xs={12} md={4} className={classes.imgContainer}>
          <img src={image} className={classes.image} />
        </Grid>
      </Grid>
    </Container>
  );
};

Explanation.prototypes = {
  explanation: PropTypes.exact({
    text: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default Explanation;

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    minHeight: "400px",
  },
  imgContainer: {
    alignSelf: "stretch",
    maxHeight: "400px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    boxShadow: theme.shadows[2],
  },
}));
