import React, { useMemo } from "react";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { crop, scale } from "@cloudinary/base/actions/resize";
import { makeStyles } from "@material-ui/core/styles";
import { useCloudinary, useBreakpoint, useSettings } from "utils";

const Logo: React.FC = () => {
  const { logo } = useSettings();

  const breakpoints = useBreakpoint();
  const cldImage = useCloudinary(logo, () => null, [breakpoints]);

  const alt = "CORE Coaching & Consulting";

  const [memoizedImg, height] = useMemo(() => {
    const heights = {
      xs: 130,
      sm: 180,
      md: 200,
      lg: 220,
    };
    if (!cldImage || typeof window === "undefined") return [null, heights.lg];

    const { sm, md, lg } = breakpoints;

    let height: number;

    if (!sm) height = heights.xs;
    else if (!md) height = heights.sm;
    else if (!lg) height = heights.md;
    else height = heights.lg;

    cldImage.resize(scale().height(height));

    return [cldImage, height];
  }, [breakpoints, cldImage]);

  const { className } = makeStyles({
    className: {
      height,
    },
  })();

  if (!memoizedImg) return null;

  return (
    <AdvancedImage
      cldImg={memoizedImg}
      alt={alt}
      className={className}
      height={height}
    />
  );
};

export default Logo;
