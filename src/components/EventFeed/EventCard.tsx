import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@material-ui/core";
import { Link } from "gatsby";
import { LanguageDisplay, EventStatus, Image } from "components";
import { Event } from "types";
import { useBreakpoint } from "utils";

type EventProps = {
  event: Pick<
    Event,
    "title" | "date" | "image" | "language" | "slug" | "isOnline" | "tickets"
  >;
};

const EventCard: React.FC<EventProps> = ({ event }) => {
  const { title, date, image, language, slug, isOnline } = event;

  const breakpoints = useBreakpoint();
  const classes = useStyles({ breakpoints })();

  const imageSize = () => {
    const { md, sm } = breakpoints;

    if (md) return 400;
    if (sm) return 720;
    return 420;
  };

  return (
    <Card className={classes.card} elevation={3} square>
      <CardActionArea
        component={Link}
        to={`/event${slug}`}
        className={classes.cardActionArea}
      >
        <div className={classes.imageWrapper}>
          <Image
            src={image}
            className={classes.image}
            width={imageSize()}
            alt={`Event that happens on ${moment(date).format("MMM D")}`}
          />
        </div>
        <CardContent className={classes.cardContent}>
          <Typography variant="body1" className={classes.title}>
            {title}
          </Typography>
          <div className={classes.extra}>
            <LanguageDisplay code={language} showFlag />
            <Typography variant="body1">
              {isOnline ? "Online" : "In Person"}
            </Typography>
          </div>
          {date && (
            <div className={classes.date}>
              <EventStatus event={event} showDate />
            </div>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;

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
        display: "flex",
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
      eventUpcoming: {
        backgroundColor: "#03a9f4",
        color: "white",
      },
      eventEnded: {
        backgroundColor: "#fa5555",
        color: "white",
      },
      eventLive: {
        backgroundColor: "#55bd41",
        color: "white",
      },
    };
  });
