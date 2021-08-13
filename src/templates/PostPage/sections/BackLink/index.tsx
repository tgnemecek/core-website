import React from "react";
import { Container } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { Link } from "components";
import ReplyIcon from "@material-ui/icons/Reply";
import PageWrapper from "../../PageWrapper";

const BackLink: React.FC = () => {
  return (
    <Container>
      <PageWrapper>
        <Fade left distance="100px" delay={1400}>
          <Link to="/">
            <ReplyIcon style={{ marginRight: 15, marginTop: 25 }} />
            Return to Home
          </Link>
        </Fade>
      </PageWrapper>
    </Container>
  );
};

export default BackLink;
