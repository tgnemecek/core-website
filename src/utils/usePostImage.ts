import { Post } from "types";
import { getVideoId, getVideoImage, useGeneralSettings } from "utils";

type UsePostImage = (props: Pick<Post, "image" | "video">) => string;

const usePostImage: UsePostImage = ({ image, video }) => {
  const { heroImage } = useGeneralSettings();

  if (image) return image;

  if (video) {
    const videoId = getVideoId(video);
    if (videoId) return getVideoImage(videoId);
  }

  return heroImage;
};

export default usePostImage;
