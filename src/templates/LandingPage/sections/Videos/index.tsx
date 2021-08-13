import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Fade from "react-reveal/Fade";
<<<<<<< HEAD
import { Section, Gallery, Heading, VideoPlayer } from "components";
import { getVideoId, getVideoImage } from "utils";
import { Video } from "types";
=======
import YouTube from "react-youtube";
import { Section, Gallery } from "components";
import { getVideoId } from "utils";
>>>>>>> @{-1}

type VideosProps = {
  videos: RawVideoType[];
};

<<<<<<< HEAD
const Videos: React.FC<VideosProps> = ({ videos: rawVideos }) => {
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
=======
type RawVideoType = {
  title: string;
  subtitle?: string;
  link: string;
};

type VideoType = RawVideoType & {
  videoId: string;
  image: string;
};

const Videos: React.FC<VideosProps> = ({ videos: rawVideos }) => {
  const classes = useStyles();
  const [videos, setVideos] = React.useState<VideoType[]>(null);
  const [activeindex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    setVideos(
      rawVideos.map(({ title, subtitle, link }) => {
        const videoId = getVideoId(link);
        return {
          videoId,
          image: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          link,
          title,
          subtitle,
        };
      })
    );
  }, []);
>>>>>>> @{-1}

  if (!videos) return null;

  return (
    <Section className={classes.videos}>
      <Container>
<<<<<<< HEAD
        <Heading hidden>Videos</Heading>
        <Heading subheading={videos[activeindex].subtitle}>
          <Fade duration={200} key={activeindex}>
            {videos[activeindex].title}
          </Fade>
        </Heading>
        <VideoPlayer videoId={videos[activeindex].videoId} />
=======
        <Typography variant="srOnly" component="h2">
          Videos
        </Typography>
        <Fade duration={200} key={activeindex}>
          <Typography variant="h2">{videos[activeindex].title}</Typography>
          <Typography
            variant="subtitle1"
            component="p"
            className={classes.subtitle}
          >
            {videos[activeindex].subtitle}
          </Typography>
        </Fade>
        <div className={classes.videoWrapper}>
          <YouTube
            className={classes.video}
            videoId={videos[activeindex].videoId}
          />
        </div>
>>>>>>> @{-1}
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

const useStyles = makeStyles((theme) => ({
  subtitle: {
    height: 31.25,
  },
  videos: {
    background:
      "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(237,245,246,1) 100%)",
  },
}));
