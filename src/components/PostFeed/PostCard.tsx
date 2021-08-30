import React from "react";
import { format } from "date-fns";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/base/actions/resize";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@material-ui/core";
import { Link } from "gatsby";
import removeMarkdown from "markdown-to-text";
import LazyLoad from "react-lazyload";
import { Ellipsis, Image } from "components";
import { Post } from "types";
import { usePostImage, useCloudinary, useBreakpoint, getImageId } from "utils";

type PostCardProps = {
  post: Post;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { title, date, text, slug } = post;
  const { xs, sm, md, lg } = useBreakpoint();
  const classes = useStyles({ sm, lg })();

  const getEllipsisMaxCount = () => {
    if (lg) return 200;
    if (md) return 130;
    if (sm) return 270;
    if (xs) return 200;

    return 80;
  };

  const thumbnail = usePostImage(post);
  const isCloudinaryImage = Boolean(getImageId(thumbnail));

  const getImageSize = () => {
    let width = 360;
    let height = 205;

    if (!xs) {
      width = 269;
      height = 146;
    } else if (!sm) {
      width = 464;
      height = 257;
    } else if (!md) {
      width = 713;
      height = 265;
    }

    return {
      width,
      height,
    };
  };

  const cldImage = useCloudinary(
    thumbnail,
    (cld) => {
      const { width, height } = getImageSize();

      cld.resize(fill(width, height));
    },
    [xs, sm, md]
  );

  return (
    <Card className={classes.card} elevation={3} square>
      <CardActionArea
        component={Link}
        to={`/post${slug}`}
        className={classes.cardActionArea}
      >
        <LazyLoad
          height="100%"
          once
          classNamePrefix={`${classes.imageWrapper} lazyload`}
        >
          {isCloudinaryImage ? (
            cldImage && (
              <AdvancedImage cldImg={cldImage} className={classes.image} />
            )
          ) : (
            <Image
              src={thumbnail}
              className={classes.image}
              alt={`Post created on ${format(date, "MMM d")}`}
            />
          )}
        </LazyLoad>
        <CardContent>
          <Typography variant="body1" className={classes.title}>
            <Ellipsis text={title} max={60} component="span" />
          </Typography>
          <Typography variant="body1" className={classes.body}>
            <Ellipsis
              text={removeMarkdown(text)}
              component="span"
              max={getEllipsisMaxCount()}
              ellipsis={
                <span>
                  ...<span className={classes.readMore}> Read more</span>
                </span>
              }
            />
          </Typography>
          <Typography variant="body1" className={classes.date}>
            {format(date, "MMM dd, yyyy")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostCard;

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
