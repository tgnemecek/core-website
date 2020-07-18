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

  React.useEffect(() => {
    setVideos(
      props.videos.map(({ title, link }) => {
        const videoIdIndex = link.indexOf("?v=") + 3;
        const videoId = link.slice(videoIdIndex);
        return {
          videoId,
          image: `http://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
          link,
          title,
        };
      })
    );
  }, []);

  return (
    <section className={classes.videos}>
      <Container>
        <Typography variant="h2">Videos</Typography>
        <Typography variant="h3" align="center">
          {videos && videos[index].title}
        </Typography>
        <div className={classes.videoWrapper}>
          <YouTube
            videoId={videos && videos[index].videoId}
            opts={{
              height: 315,
              width: 560,
            }}
          />
        </div>
        <Gallery items={videos} index={index} setIndex={setIndex} />
      </Container>
    </section>
  );
};

export default Videos;

const useStyles = makeStyles((theme) => ({
  videos: {},
  videoWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));
