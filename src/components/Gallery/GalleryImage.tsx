import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { scale, fill } from "@cloudinary/base/actions/resize";
import { useCloudinary, useBreakpoint, getImageId } from "utils";

type ProductImageProps = {
  src: string;
  alt: string;
};

const LARGE_HEIGHT = 280;

const SMALL_WIDTH = 180;
const SMALL_HEIGHT = 180;

const CloudinaryGalleryImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  const { md } = useBreakpoint();

  const image = useCloudinary(
    src,
    (cld) => {
      if (md) {
        cld.resize(scale(undefined, LARGE_HEIGHT));
        return;
      }
      cld.resize(fill(SMALL_WIDTH, SMALL_HEIGHT));
    },
    [md]
  );

  if (!image) return null;

  return <AdvancedImage cldImg={image} alt={alt} />;
};

const GalleryImage: React.FC<ProductImageProps> = (props) => {
  const isImageFromCloudinary = Boolean(getImageId(props.src));

  if (isImageFromCloudinary) {
    return <CloudinaryGalleryImage {...props} />;
  }

  return <img {...props} />;
};

export default GalleryImage;
