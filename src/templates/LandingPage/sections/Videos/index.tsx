import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import YouTube from "react-youtube";
import { Section, Gallery } from "components";
import { getVideoId } from "utils";

type VideosProps = {
  videos: RawVideoType[];
};

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

  if (!videos) return null;

  return (
    <Section className={classes.videos}>
      <Container>
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
