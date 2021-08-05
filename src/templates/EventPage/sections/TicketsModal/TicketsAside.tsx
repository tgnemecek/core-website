import React from "react";
import moment from "moment";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "components";
import EventContext from "../../EventContext";
import FeatureList from "../../FeatureList";

const TicketsAside: React.FC = () => {
  const {
    event: { title, subtitle, image, date },
  } = React.useContext(EventContext)!;

  const classes = useStyles();

  return (
    <div>
      <div className={classes.imageWrapper}>
        <Image src={image} width="auto" />
      </div>
      <div className={classes.info}>
        <div>
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
        </div>
        <FeatureList dense />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  imageWrapper: {
    width: "100%",
    height: 160,
    "& > *": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  info: {
    backgroundColor: theme.palette.grey[200],
    padding: "30px 15px",
    display: "grid",
    alignContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      height: "400px",
    },
  },
  date: {
    fontSize: "0.9rem",
  },
  subtitle: {
    fontSize: "0.9rem",
    lineHeight: "1rem",
  },
}));

export default TicketsAside;
