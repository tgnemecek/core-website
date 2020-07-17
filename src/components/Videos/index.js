import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import YouTube from "react-youtube";
import Placeholder from "components/Placeholder";
import Link from "components/Link";
import Gallery from "components/Gallery";

const Videos = (props) => {
  const classes = useStyles();
  const [videos, setVideos] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    setVideos(
      props.videos.map(({ video }) => {
        const videoIdIndex = video.indexOf("?v=") + 3;
        const videoId = video.slice(videoIdIndex);
        return {
          videoId,
          // image: `http://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
          videoLink: video,
        };
      })
    );
    getVideoTitle();
  }, []);

  const getVideoTitle = async () => {
    // const videoLink = videos[index].videoLink;
  };

  const onReady = (e) => {
    console.log({ e });
  };

  return (
    <section className={classes.videos}>
      <Container>
        <Typography variant="h2">Videos</Typography>
        <h1>{title}</h1>
        <div className={classes.videoWrapper}>
          <YouTube
            showinfo={1}
            videoId={videos && videos[index].videoId}
            opts={{
              height: 315,
              width: 560,
            }}
            onReady={onReady}
          />
        </div>
        <Gallery items={videos} index={index} setIndex={setIndex} />
      </Container>
    </section>
  );
};

export default Videos;

const useStyles = makeStyles((theme) => ({
  videos: {
    marginBottom: theme.spacing(8),
  },
  videoWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));
