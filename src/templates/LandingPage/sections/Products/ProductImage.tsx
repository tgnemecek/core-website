import React from "react";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { scale } from "@cloudinary/base/actions/resize";
import { useCloudinary, useBreakpoint } from "utils";

type ProductImageProps = {
  src: string;
  alt: string;
};

const SMALL_WIDTH = 200;
const LARGE_HEIGHT = 500;

const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  const { md } = useBreakpoint();

  const image = useCloudinary(
    src,
    (cld) => {
      if (md) {
        cld.resize(scale(undefined, LARGE_HEIGHT));
        return;
      }
      cld.resize(scale(SMALL_WIDTH, undefined));
    },
    [md]
  );

  return (
    <AdvancedImage cldImg={image!} plugins={[placeholder("blur")]} alt={alt} />
  );
};

export default ProductImage;
