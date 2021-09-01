import React from "react";
import { VideoPlayer } from "components";
import { getVideoId } from "utils";

type VideoProps = {
  video: string;
};

const Video: React.FC<VideoProps> = ({ video }) => {
  const videoId = getVideoId(video);

  return (
    <div style={{ paddingTop: 25 }}>
      <VideoPlayer videoId={videoId} />
    </div>
  );
};

export default Video;
