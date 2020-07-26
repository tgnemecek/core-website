import React from "react";
import loadable from "@loadable/component";

// This is necessary because the component uses 'window', which is not accessible server-side
const Feed = loadable(() => import("./Feed"));

export default function HorizontalFeed(props) {
  return <Feed {...props}>{props.children}</Feed>;
}
