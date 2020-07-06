import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Placeholder from "src/components/Placeholder/Placeholder";
import YouTube from "react-youtube";
import Link from "src/components/Link/Link";

import Gallery from "src/components/Gallery/Gallery";

const TEMP_DATA = [
  "https://www.youtube.com/watch?v=5qap5aO4i9A",
  "https://www.youtube.com/watch?v=ArBZpMMhjuQ",
  "https://www.youtube.com/watch?v=GHp-spiklWE",
];

const Videos = ({ isPreview }) => {
  const classes = useStyles();
  const [videos, setVideos] = React.useState(null);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    // Fetch
    setTimeout(() => {
      const data = TEMP_DATA;
      setVideos(
        data.map((url) => {
          const videoIdIndex = url.indexOf("?v=") + 3;
          const videoId = url.slice(videoIdIndex);
          return {
            videoId,
            image: `http://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
          };
        })
      );
    }, 200);
  }, []);

  return (
    <section className={classes.videos}>
      {isPreview ? (
        <Placeholder text="Videos from Youtube are shown here" />
      ) : (
        <Container>
          <Typography variant="h2">Videos</Typography>
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
      )}
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
