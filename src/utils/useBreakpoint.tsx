import React from "react";
import { ResizeListenerContext } from "components";

const useBreakpoint = () => {
  const breakpoints = React.useContext(ResizeListenerContext);
  return breakpoints;
};

export default useBreakpoint;
