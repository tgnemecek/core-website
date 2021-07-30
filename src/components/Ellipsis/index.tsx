import React from "react";

type EllipsisProps = {
  text: string;
  max: number;
  component?: string | React.FC;
  ellipsis?: React.ReactNode;
};

const Ellipsis: React.FC<EllipsisProps> = ({
  component = "p",
  text,
  max,
  ellipsis = "...",
}) => {
  const Component = component as React.FC;

  const getFormattedText = () => {
    if (text.length < max) return text;
    const reducedText = text.slice(0, max).trim();
    return (
      <>
        {reducedText}
        {ellipsis}
      </>
    );
  };

  return <Component>{getFormattedText()}</Component>;
};

export default Ellipsis;
