import React from "react";
import moment from "moment";
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
import { EventType } from "types";

type EventProps = {
  event: Pick<
    EventType,
    "title" | "date" | "image" | "language" | "subtitle" | "slug"
  >;
};

const Event: React.FC<EventProps> = ({
  event: { title, date, image, language, subtitle, slug },
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={3} square>
      <CardActionArea
        component={Link}
        to={`/event${slug}`}
        className={classes.cardActionArea}
      >
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
          <div className={classes.language}>
            <Typography variant="body1">{language}</Typography>
          </div>
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
    width: "100%",
    "&:hover img": {
      transform: "scale(1.2, 1.2)",
    },
  },
  cardActionArea: {
    display: "grid",
    gridTemplateColumns: "100%",
    gridTemplateRows: "1fr 30%",
    height: "100%",
    width: "100%",
  },
  imageWrapper: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    transition: "all 0.5s ease-in-out",
  },
  cardContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoRows: "1fr auto",
    padding: "10px 15px",
    height: "100%",
  },
  title: {
    fontSize: "1.2rem",
    gridColumnEnd: "span 2",
  },
  language: {
    "& > *": {
      fontSize: "0.9rem",
    },
  },
  date: {
    textAlign: "right",
    paddingRight: theme.spacing(1),
    "& > *": {
      fontSize: "0.9rem",
    },
  },
}));
