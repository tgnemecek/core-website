import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import Link from "components/Link/Link";

export default function Item({
  title,
  date,
  url,
  image,
  titleComponent = "h3",
  itemWidth,
  itemHeight,
}) {
  const classes = useStyles({ itemWidth, itemHeight })();

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardActionArea className={classes.cardActionArea}>
          <CardMedia image={image} className={classes.image} title="Event" />
          <CardContent className={classes.cardContent}>
            {date && (
              <div className={classes.date}>
                <Typography variant="body1">
                  {moment(date).format("ddd MM/DD")}
                </Typography>
              </div>
            )}
            <Typography variant="h4" component={titleComponent}>
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

const useStyles = ({ itemWidth, itemHeight }) =>
  makeStyles((theme) => ({
    card: {
      minWidth: itemWidth,
      maxWidth: itemWidth,
    },
    image: {
      height: 200,
      objectFit: "cover",
    },
    cardContent: {
      position: "relative",
      height: itemHeight / 3,
    },
    date: {
      textAlign: "right",
      position: "absolute",
      bottom: 0,
      right: theme.spacing(1),
      paddingBottom: theme.spacing(1) / 2,
    },
  }));
