import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import YouTube from "react-youtube";
import Section from "components/Section";
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
    <Section>
      <Container>
        <Typography variant="srOnly" component="h2">
          Videos
        </Typography>
        <Typography variant="h3" align="center">
          {videos && videos[index].title}
        </Typography>
        <div className={classes.videoWrapper}>
          <YouTube
            className={classes.video}
            videoId={videos && videos[index].videoId}
            // opts={{
            //   height: 315,
            //   width: 900,
            // }}
          />
        </div>
        <Gallery items={videos} index={index} setIndex={setIndex} />
      </Container>
    </Section>
  );
};

export default Videos;

const useStyles = makeStyles((theme) => ({
  videoWrapper: {
    width: "80%",
    position: "relative",
    paddingTop: "56.25%",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
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
