import { Post } from "types";
import { getVideoId, getVideoImage, useGeneralSettings } from "utils";

const usePostImage = ({ image, video }: Post) => {
  const { heroImage } = useGeneralSettings();

  if (image) return image;

  if (video) {
    const videoId = getVideoId(video);
    return getVideoImage(videoId);
  }

  return heroImage;
};

export default usePostImage;
