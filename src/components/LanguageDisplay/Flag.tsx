import React from "react";
import { Language } from "types";
import flagLibrary from "./flagLibrary";
import { JSXFlagProps } from "./types";

type FlagProps = JSXFlagProps & {
  code: Language;
};

const Flag: React.FC<FlagProps> = ({ code, ...props }) => {
  const Component = flagLibrary[code];

  return <Component {...props} />;
};

export default Flag;
