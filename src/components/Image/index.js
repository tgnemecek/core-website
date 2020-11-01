import React from "react";
import { Image as CloudinaryImage } from "cloudinary-react";
import { getImageId } from "src/util";

const Image = ({ src = "", ...props }) => (
  <CloudinaryImage
    cloudName="core-coaching-consulting"
    publicId={getImageId(src)}
    responsive
    {...props}
  />
);

export default Image;
