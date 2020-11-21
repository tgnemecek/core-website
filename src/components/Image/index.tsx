import React from "react";
import { Image as CloudinaryImage } from "cloudinary-react";
import { getImageId } from "utils";

// Check main props here: https://cloudinary.com/documentation/image_transformations#resizing_and_cropping_images

type ImageProps = {
  src?: string;
};

const Image: React.FC<ImageProps> = ({ src = "", ...props }) => {
  const publicId = getImageId(src);

  if (publicId) {
    return (
      <CloudinaryImage
        cloudName="core-coaching-consulting"
        publicId={getImageId(src)}
        crop="fill"
        fetchFormat="auto"
        secure
        responsive
        {...props}
      />
    );
  }

  return <img src={src} {...props} />;
};

export default Image;
