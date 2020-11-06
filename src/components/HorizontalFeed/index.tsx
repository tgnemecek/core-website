import React from "react";
import loadable from "@loadable/component";

// This is necessary because the component uses 'window', which is not accessible server-side
const Feed = loadable(() => import("./Feed"));

const HorizontalFeed: React.FC<any> = ({ children, ...props }) => {
  return <Feed {...props}>{children}</Feed>;
};

export default HorizontalFeed;
