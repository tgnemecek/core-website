import React from "react";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { scale } from "@cloudinary/base/actions/resize";
import { useCloudinary, useGeneralSettings } from "utils";

const WIDTH = 50;
const ALT = "CORE Logo Icon";

const LogoIcon: React.FC = () => {
  const { logo } = useGeneralSettings();

  const cldImage = useCloudinary(
    logo,
    (cld) => cld.resize(scale().width(WIDTH)),
    []
  );

  if (!cldImage) return null;

  return (
    <AdvancedImage
      cldImg={cldImage}
      plugins={[placeholder("blur")]}
      alt={ALT}
      width={WIDTH}
      height={WIDTH}
    />
  );
};

export default LogoIcon;
