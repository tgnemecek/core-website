import React from "react";
import { breakpoints } from "utils";

const breakpointMap = breakpoints.values;

export type UseBreakpointState = Record<
  "xs" | "sm" | "md" | "lg" | "xl",
  boolean
>;

const useBreakpoint = () => {
  const [state, setState] = React.useState<UseBreakpointState>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
  });

  const onResize = () => {
    setState((prevState) => {
      const { innerWidth: width } = window;
      let hasChanged = false;

      const newState = { ...prevState };

      Object.keys(breakpointMap).forEach((key: keyof UseBreakpointState) => {
        const point = breakpointMap[key];
        const result = width >= point;
        if (result !== prevState[key]) hasChanged = true;
        newState[key] = result;
      });

      // To prevent unnecessary re-renders:
      if (hasChanged) {
        return newState;
      }
      return prevState;
    });
  };

  React.useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return state;
};

export default useBreakpoint;
