import React from "react";
import { isVideoValid } from "utils";
import { CmsWidgetControlProps } from "netlify-cms-core";

class VideoWidget extends React.Component<CmsWidgetControlProps> {
  isValid = () => {
    const valid = isVideoValid(this.props.value);

    if (!valid) {
      return {
        error: {
          message: "The provided link is invalid. Please double check.",
        },
      };
    }
    return true;
  };

  render() {
    const { classNameWrapper, forID, value, onChange } = this.props;

    return (
      <input
        className={classNameWrapper}
        id={forID}
        onChange={({ target: { value } }) => onChange(value)}
        value={value}
      />
    );
  }
}

export default VideoWidget;
