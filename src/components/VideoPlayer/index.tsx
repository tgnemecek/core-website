import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import YouTube from "react-youtube";

type VideoPlayerProps = {
  videoId: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const classes = useStyles();

  return (
    <div className={classes.videoWrapper}>
      <YouTube className={classes.video} videoId={videoId} />
    </div>
  );
};

export default VideoPlayer;

const videoPercentPadding = 40;

const useStyles = makeStyles((theme) => ({
  videoWrapper: {
    width: `${100 - videoPercentPadding}%`,
    position: "relative",
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
