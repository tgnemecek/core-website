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
import { Image } from "components";
import { ServiceExplanationType } from "types";

const imageHeight = 400;

type ServiceExplanationProps = {
  explanation: ServiceExplanationType;
};

const ServiceExplanation: React.FC<ServiceExplanationProps> = ({
  explanation: { text, image },
}) => {
  const classes = useStyles();

  const preparedText = () => {
    return (
      <ReactMarkdown
        source={text}
        renderers={{
          paragraph: (props) => (
            <Typography
              {...props}
              variant="body1"
              style={{ marginBottom: 10 }}
            />
          ),
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
          blockquote: (props) => (
            <Typography {...props} variant="h4" style={{ marginTop: 15 }} />
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

export default ServiceExplanation;

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
