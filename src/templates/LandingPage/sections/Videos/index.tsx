import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import YouTube from "react-youtube";
import { Section, Gallery, Heading } from "components";
import { getVideoId } from "utils";
import { Video } from "types";

type VideosProps = {
  videos: Video[];
};

type FormattedVideo = Video & {
  videoId: string;
  image: string;
};

const Videos: React.FC<VideosProps> = ({ videos: rawVideos }) => {
  const classes = useStyles();
  const [videos, setVideos] = React.useState<FormattedVideo[]>(null);
  const [activeindex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const {
      location: { protocol },
    } = window;

    setVideos(
      rawVideos.map(({ title, subtitle, link }) => {
        const videoId = getVideoId(link);
        return {
          videoId,
          image: `${protocol}//img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          link,
          title,
          subtitle,
        };
      })
    );
  }, []);

  if (!videos) return null;

  return (
    <Section className={classes.videos}>
      <Container>
        <Heading hidden>Videos</Heading>
        <Heading subheading={videos[activeindex].subtitle}>
          <Fade duration={200} key={activeindex}>
            {videos[activeindex].title}
          </Fade>
        </Heading>
        <div className={classes.videoWrapper}>
          <YouTube
            className={classes.video}
            videoId={videos[activeindex].videoId}
          />
        </div>
        <Gallery
          images={videos.map(({ image }) => image)}
          activeIndex={activeindex}
          setActiveIndex={setActiveIndex}
          itemHeight={200}
        />
      </Container>
    </Section>
  );
};

export default Videos;

const videoPercentPadding = 40;

const useStyles = makeStyles((theme) => ({
  subtitle: {
    height: 31.25,
  },
  videos: {
    background:
      "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(237,245,246,1) 100%)",
  },
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
