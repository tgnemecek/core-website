import React from "react";
import { Section } from "components";

type BodyProps = {
  body: string;
};

const Body: React.FC<BodyProps> = ({ body }) => {
  return <Section>{body}</Section>;
};

export default Body;
