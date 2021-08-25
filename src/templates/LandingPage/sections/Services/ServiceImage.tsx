import React from "react";
import { makeStyles } from "@material-ui/styles";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/base/actions/resize";
import LazyLoad from "react-lazyload";
import { useCloudinary, useBreakpoint } from "utils";

type ServiceImageProps = {
  alt: string;
  src: string;
  isHovering?: boolean;
  isHoveringAnotherItem?: boolean;
};

const WIDTH_LARGE = 366;
const HEIGHT_LARGE = 700;

const HEIGHT_SMALL = 200;

const HOVER_GROWTH = 10; // Percent

const ServiceImage: React.FC<ServiceImageProps> = ({
  src,
  alt,
  isHovering,
  isHoveringAnotherItem,
}) => {
  const { md } = useBreakpoint();

  const getStyle = () => {
    let style = {};
    if (isHovering) {
      style = {
        height: `${100 + HOVER_GROWTH}%`,
        width: `${100 + HOVER_GROWTH}%`,
        top: `-${HOVER_GROWTH / 2}%`,
        left: `-${HOVER_GROWTH / 2}%`,
      };
    } else if (isHoveringAnotherItem) {
      style = {
        filter: "grayscale(100%) contrast(50%)",
      };
    }
    return style;
  };

  const image = useCloudinary(
    src,
    (cld) => {
      if (md) {
        cld.resize(fill(WIDTH_LARGE, HEIGHT_LARGE));
        return;
      }

      cld.resize(fill(window.innerWidth, HEIGHT_SMALL));
    },
    [md]
  );

  const { className } = makeStyles({
    className: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0,
      transition: "all 0.5s",
    },
  })();

  return (
    <LazyLoad height="100%" once>
      <AdvancedImage
        alt={alt}
        cldImg={image!}
        className={className}
        style={getStyle()}
      />
    </LazyLoad>
  );
};

export default ServiceImage;
