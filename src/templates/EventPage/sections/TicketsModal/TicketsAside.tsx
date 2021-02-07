import React from "react";
import moment from "moment";
import { graphql, PageProps } from "gatsby";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  Typography,
  CircularProgress,
  Modal,
  Dialog,
  IconButton,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { Image } from "components";
import EventContext from "../../EventContext";
import FeatureList from "../../FeatureList";

const imageWidth = 320;

const TicketsAside: React.FC = () => {
  const {
    event: { title, subtitle, image, date },
  } = React.useContext(EventContext);

  const classes = useStyles();

  return (
    <div>
      <div className={classes.imageWrapper}>
        <Image src={image} width={imageWidth} />
      </div>
      <div className={classes.info}>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.date}
        >
          {moment(date).format("MMMM D, YYYY")}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" className={classes.subtitle}>
          {subtitle}
        </Typography>
        <FeatureList dense />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  imageWrapper: {
    width: imageWidth,
    height: imageWidth / 2,
    "& > *": {
      height: "100%",
      objectFit: "cover",
    },
  },
  info: {
    backgroundColor: theme.palette.grey[200],
    padding: "30px 15px",
  },
  date: {
    fontSize: "0.9rem",
  },
  subtitle: {
    fontSize: "0.9rem",
    lineHeight: "1rem",
    marginBottom: 60,
  },
}));

export default TicketsAside;
