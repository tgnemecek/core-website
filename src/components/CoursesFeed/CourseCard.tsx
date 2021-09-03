import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@material-ui/core";
import { Link } from "gatsby";
import LazyLoad from "react-lazyload";
import { Ellipsis, Image } from "components";
import { Course } from "types";
import { useBreakpoint } from "utils";

type CourseCardProps = {
  course: Course;
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { name, description, slug, image } = course;
  const { xs, sm, md, lg } = useBreakpoint();
  const classes = useStyles({ sm, lg })();

  const getEllipsisMaxCount = () => {
    if (lg) return 200;
    if (md) return 130;
    if (sm) return 270;
    if (xs) return 200;

    return 80;
  };

  const getImageWithSize = () => {
    if (!image) return undefined;

    let width = 360;

    if (!xs) {
      width = 269;
    } else if (!sm) {
      width = 464;
    } else if (!md) {
      width = 713;
    }

    return `${image}?width=${width}`;
  };

  const link = `https://www.corelearningzone.com/courses/${slug}`;

  return (
    <Card className={classes.card} elevation={3} square>
      <CardActionArea
        component={Link}
        to={link}
        target="_blank"
        rel="noopener"
        className={classes.cardActionArea}
      >
        <LazyLoad
          height="100%"
          once
          classNamePrefix={`${classes.imageWrapper} lazyload`}
        >
          <Image
            src={getImageWithSize()}
            className={classes.image}
            alt="Course"
          />
        </LazyLoad>
        <CardContent>
          <Typography variant="body1" className={classes.title}>
            <Ellipsis text={name} max={60} component="span" />
          </Typography>
          <Typography variant="body1" className={classes.body}>
            <Ellipsis
              text={description || ""}
              component="span"
              max={getEllipsisMaxCount()}
              ellipsis={
                <span>
                  ...<span className={classes.readMore}> Read more</span>
                </span>
              }
            />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;

type UseStylesProps = Partial<ReturnType<typeof useBreakpoint>>;

const useStyles = ({ sm, lg }: UseStylesProps) =>
  makeStyles((theme) => {
    const getTitleFontSize = () => {
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
      title: {
        fontSize: getTitleFontSize(),
        gridColumnEnd: "span 2",
        minHeight: `calc(${getTitleFontSize()} * 2)`,
        lineHeight: 1,
        marginBottom: 10,
      },
      body: {
        fontSize: lg ? 13 : 12,
      },
      readMore: {
        color: "blue",
      },
      extra: {
        display: "flex",
        "& > *": {
          fontSize: "0.9rem",
        },
      },
      date: {
        textAlign: "right",
        fontSize: lg ? 13 : 12,
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
