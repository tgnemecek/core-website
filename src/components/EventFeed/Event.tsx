import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { Link } from "gatsby";
import { Language } from "components";
import { EventType } from "types";
import { useBreakpoint } from "utils";

type EventProps = {
  event: Pick<EventType, "title" | "date" | "image" | "language" | "slug">;
};

const Event: React.FC<EventProps> = ({
  event: { title, date, image, language, slug },
}) => {
  const breakpoints = useBreakpoint();
  const classes = useStyles({ breakpoints })();

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
          <Typography variant="body1" className={classes.title}>
            {title}
          </Typography>
          <div className={classes.extra}>
            <Language code={language} showFlag />
          </div>
          {date && (
            <div className={classes.date}>
              <Typography variant="body1">
                {moment(date).format("MMM D")}
              </Typography>
            </div>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Event;

type UseStylesProps = {
  breakpoints: Record<string, boolean>;
};

const useStyles = ({ breakpoints }: UseStylesProps) =>
  makeStyles((theme) => {
    const getTitleFontSize = () => {
      const { sm } = breakpoints;
      if (sm) return "1.2rem";
      return "0.9rem";
    };

    return {
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
        gridTemplateRows: "1fr auto",
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
        fontSize: getTitleFontSize(),
        gridColumnEnd: "span 2",
        minHeight: `calc(${getTitleFontSize()} * 2)`,
        lineHeight: 1,
        marginBottom: 10,
      },
      extra: {
        "& > *": {
          fontSize: "0.9rem",
        },
      },
      date: {
        textAlign: "right",
        "& > *": {
          fontSize: "0.9rem",
        },
      },
    };
  });
