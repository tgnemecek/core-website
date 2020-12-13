import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import YouTube from "react-youtube";
import { getVideoId } from "utils";
import { EventType } from "types";

type VideoProps = Pick<EventType, "video">;

const Video: React.FC<VideoProps> = ({ video }) => {
  const classes = useStyles();

  if (!video) return null;

  return (
    <section className={classes.section}>
      <div className={classes.videoWrapper}>
        <YouTube className={classes.video} videoId={getVideoId(video)} />
      </div>
    </section>
  );
};

export default Video;

const videoPercentPadding = 30;

const useStyles = makeStyles((theme) => ({
  section: {
    background: theme.palette.grey[300],
  },
  videoWrapper: {
    position: "relative",
    width: `${100 - videoPercentPadding}%`,
    paddingTop: `${56.25 - videoPercentPadding / 2}%`,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingTop: "56.25%",
    },
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
}));
