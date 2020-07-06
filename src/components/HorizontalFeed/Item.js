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
import Link from "src/components/Link/Link";

const titleMaxLength = 25;

export default function Item({
  title,
  date,
  url,
  image,
  titleComponent = "h3",
  itemWidth,
  itemHeight,
  imageHeight,
}) {
  const classes = useStyles({ itemWidth, itemHeight, imageHeight })();

  return (
    <Grid item>
      <Card className={classes.card} elevation={3} square>
        <CardActionArea
          className={classes.cardActionArea}
          component={Link}
          to={url}
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
              component={Typography}
              variant="h4"
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
              style={{ whiteSpace: "pre-wrap" }}
            />
          </CardContent>
          {date && (
            <div className={classes.date}>
              <Typography variant="body1">
                {moment(date).format("ddd MM/DD")}
              </Typography>
            </div>
          )}
        </CardActionArea>
      </Card>
    </Grid>
  );
}

const useStyles = ({ itemWidth, itemHeight, imageHeight = 280 }) =>
  makeStyles((theme) => ({
    card: {
      minWidth: itemWidth,
      maxWidth: itemWidth,
      "&:hover img": {
        transform: "scale(1.2, 1.2)",
      },
    },
    imageWrapper: {
      height: imageHeight,
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
      height: itemHeight - imageHeight,
    },
    date: {
      textAlign: "right",
      paddingRight: theme.spacing(1),
    },
  }));
