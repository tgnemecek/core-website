import React from "react";
import moment from "moment";
import Fade from "react-reveal/Fade";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import LinesEllipsis from "react-lines-ellipsis";
import { Link } from "gatsby";
import { EventDTO } from "./types";

type EventProps = EventDTO;

const Event: React.FC<EventProps> = ({ title, date, url, image }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={3} square>
      <CardActionArea component={Link} to={url}>
        <div className={classes.imageWrapper}>
          <CardMedia
            image={image}
            className={classes.image}
            title="Event"
            component="img"
          />
        </div>
        <CardContent className={classes.cardContent}>
          <LinesEllipsis
            text={title}
            className={classes.title}
            component={Typography}
            variant="h4"
            maxLine="4"
            ellipsis="..."
            trimRight
            basedOn="letters"
            style={{ whiteSpace: "pre-wrap" }}
          />
          {date && (
            <div className={classes.date}>
              <Typography variant="body1">
                {moment(date).format("ddd MM/DD")}
              </Typography>
            </div>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Event;

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    "&:hover img": {
      transform: "scale(1.2, 1.2)",
    },
  },
  imageWrapper: {
    height: 280,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    transition: "all 0.5s ease-in-out",
  },
  cardContent: {
    position: "relative",
    height: 160,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "1.2rem",
  },
  date: {
    textAlign: "right",
    paddingRight: theme.spacing(1),
  },
}));
