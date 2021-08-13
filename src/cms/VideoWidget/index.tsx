import React from "react";
import { isVideoValid } from "utils";
import { CustomWidget } from "../types";

const VideoWidget: CustomWidget = ({
  value = "",
  forID,
  classNameWrapper,
  onChange,
}) => {
  const isValid = () => {
    const valid = isVideoValid(value);
    if (!valid) {
      return {
        error: {
          message: "The provided link is invalid. Please double check.",
        },
      };
    }
    return true;
  };

  return (
    <input
      className={classNameWrapper}
      id={forID}
      onChange={({ target: { value } }) => onChange(value)}
      value={value}
    />
  );
};

export default VideoWidget;
