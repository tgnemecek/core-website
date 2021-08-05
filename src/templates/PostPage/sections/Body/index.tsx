import React from "react";
import moment from "moment";
import { Container } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { Markdown, Heading } from "components";

type BodyProps = {
  title: string;
  body: string;
  date: Date;
};

const Body: React.FC<BodyProps> = ({ title, body, date }) => {
  return (
    <Container>
      <Heading subheading={moment(date).format("MMMM DD, YYYY")} showLine>
        <Fade left distance="100px">
          {title}
        </Fade>
      </Heading>
      <Fade left distance="100px" delay={500}>
        <Markdown text={body} />
      </Fade>
    </Container>
  );
};

export default Body;
