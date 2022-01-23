import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import LazyLoad from "react-lazyload";
import { Section, Gallery, Heading, VideoPlayer } from "components";
import { getVideoId, getVideoImage } from "utils";
import { Video } from "types";

type VideosProps = {
  videos: Video[];
};

const VideosSection: React.FC<VideosProps> = ({ videos: rawVideos }) => {
  const classes = useStyles();
  const [activeindex, setActiveIndex] = React.useState(0);

  const videos = useMemo(() => {
    return rawVideos.map(({ title, subtitle, link }) => {
      const videoId = getVideoId(link);
      return {
        videoId,
        image: videoId ? getVideoImage(videoId) : "",
        link,
        title,
        subtitle,
      };
    });
  }, [rawVideos]);

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
        <LazyLoad height="100%" once>
          <VideoPlayer videoId={videos[activeindex].videoId} />
        </LazyLoad>
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

export default VideosSection;

const useStyles = makeStyles(() => ({
  subtitle: {
    height: 31.25,
  },
  videos: {
    background:
      "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(237,245,246,1) 100%)",
  },
}));
