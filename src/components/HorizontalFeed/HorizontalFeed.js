import React from "react";
import loadable from "@loadable/component";

const LazyHorizontalFeed = loadable(() => import("./LazyHorizontalFeed"));

export default function HorizontalFeed(props) {
  return <LazyHorizontalFeed {...props}>{props.children}</LazyHorizontalFeed>;
}
