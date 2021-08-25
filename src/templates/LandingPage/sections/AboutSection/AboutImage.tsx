import React from "react";
import { makeStyles } from "@material-ui/styles";
import { scale } from "@cloudinary/base/actions/resize";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import LazyLoad from "react-lazyload";
import { useCloudinary, useGeneralSettings, useBreakpoint } from "utils";

const SIZE_LARGE = 400;
const SIZE_SMALL = 250;

const AboutImage: React.FC = () => {
  const { logo } = useGeneralSettings();
  const breakpoints = useBreakpoint();

  const image = useCloudinary(
    logo,
    (cld) => {
      const { md } = breakpoints;

      const size = md ? SIZE_LARGE : SIZE_SMALL;

      cld.resize(scale().width(size).height(size));
    },
    [breakpoints]
  );

  const { className } = makeStyles({
    className: {
      width: "100%",
      height: "100%",
      maxWidth: SIZE_LARGE,
      maxHeight: SIZE_LARGE,
      minHeight: SIZE_SMALL,
      minWidth: SIZE_SMALL,
      objectFit: "contain",
    },
  })();

  return (
    <LazyLoad once height="100%">
      <AdvancedImage
        cldImg={image!}
        plugins={[placeholder("blur")]}
        alt="CORE Logo"
        className={className}
      />
    </LazyLoad>
  );
};

export default AboutImage;
