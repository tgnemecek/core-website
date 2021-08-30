import React from "react";
import { breakpoints } from "utils";

export type Breakpoints = Record<keyof typeof breakpoints, boolean>;

const initState: Breakpoints = {
  xs: true,
  sm: true,
  md: true,
  lg: true,
  xl: true,
};

const breakpointMap = breakpoints;

const ResizeListenerContext = React.createContext<Breakpoints>(initState);

export const ResizeListenerProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<Breakpoints>(initState);

  const onResize = () => {
    setState((prevState) => {
      const { innerWidth: width } = window;
      let hasChanged = false;

      const newState = { ...prevState };

      Object.keys(breakpointMap).forEach((key: keyof Breakpoints) => {
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

  return (
    <ResizeListenerContext.Provider value={state}>
      {children}
    </ResizeListenerContext.Provider>
  );
};

export default ResizeListenerContext;
