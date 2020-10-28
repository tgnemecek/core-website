import React from "react";
import { isVideoValid } from "src/util";

const VideoWidget = ({
  value = "",
  field,
  forID,
  classNameWrapper,
  onChange,
}) => {
  console.log({
    componentLogging: "VideoWidget",
    value,
    field,
    forID,
    classNameWrapper,
    onChange,
  });

  const isValid = () => {
    return isVideoValid(value);
  };

  return (
    <div className={classNameWrapper}>
      <label htmlFor={forID}>YouTube Link (Optional)</label>
      <input id={forID} onChange={onChange} value={value} />
    </div>
  );
};

export default VideoWidget;
