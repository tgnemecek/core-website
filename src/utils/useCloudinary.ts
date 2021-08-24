import { useMemo, useEffect, useState } from "react";
import { Cloudinary, CloudinaryImage } from "@cloudinary/base";
import getImageId from "./getImageId";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.GATSBY_CLOUDINARY_NAME,
  },
});

type UseCloudinary = (
  src: string,
  callback?: (cldImage: CloudinaryImage) => void,
  deps?: any[]
) => CloudinaryImage | null;

const useCloudinary: UseCloudinary = (src, callback, deps = []) => {
  const imageId = getImageId(src);

  const [cldImage, setCldImage] = useState<CloudinaryImage | null>(() => {
    return cld.image(imageId ?? undefined);
  });

  useEffect(() => {
    const newImage = cld.image(imageId ?? undefined);
    setCldImage(newImage);
    callback?.(newImage);
  }, [imageId, ...deps]);

  return cldImage;
};

export default useCloudinary;
