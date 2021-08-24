import React, { useMemo } from "react";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { crop, scale } from "@cloudinary/base/actions/resize";
import { useCloudinary, useBreakpoint } from "utils";

type HeroImageProps = {
  image?: string;
  smallHeight: number;
  small?: boolean;
  className: string;
};

const HeroImage: React.FC<HeroImageProps> = ({
  image = "",
  smallHeight,
  small,
  className,
}) => {
  const breakpoints = useBreakpoint();
  const memoizedImg = useCloudinary(
    image,
    (cld) => {
      if (typeof window === "undefined") return;

      const cropHeight = small ? smallHeight : window.innerHeight;

      cld.resize(scale().width(1920)).resize(
        crop()
          .width(window.innerWidth + 300)
          .height(cropHeight)
      );
    },
    [breakpoints]
  );

  const alt = "The main CORE Elements";

  if (memoizedImg) {
    return (
      <AdvancedImage
        cldImg={memoizedImg}
        plugins={[placeholder("blur")]}
        className={className}
        alt={alt}
      />
    );
  }

  return <img src={image || ""} className={className} alt={alt} />;
};

export default HeroImage;
