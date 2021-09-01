import { Cloudinary } from "@cloudinary/base";
import getImageId from "./getImageId";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.GATSBY_CLOUDINARY_NAME,
  },
});

const useCloudinary = (src: string) => {
  const imageId = getImageId(src);

  if (imageId) {
    return cld.image(imageId);
  }

  return null;
};

export default useCloudinary;
