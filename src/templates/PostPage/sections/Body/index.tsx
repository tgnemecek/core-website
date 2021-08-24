import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { Markdown } from "components";
import PageWrapper from "../../PageWrapper";

type BodyProps = {
  title: string;
  body: string;
  date: Date;
};

const Body: React.FC<BodyProps> = ({ title, body, date }) => {
  const classes = useStyles();

  const fadeCommonProps = {
    left: true,
    distance: "100px",
  };

  return (
    <div>
      <Typography variant="h2" className={classes.heading}>
        <Fade {...fadeCommonProps}>{title}</Fade>
      </Typography>
      <PageWrapper>
        <Typography variant="body1" className={classes.subheading}>
          {`Published on ${moment(date).format("MMMM DD, YYYY")}`}
        </Typography>
      </PageWrapper>

      <Container>
        <PageWrapper>
          <Fade {...fadeCommonProps} delay={500}>
            <Markdown text={body} />
          </Fade>
          <Fade {...fadeCommonProps} delay={800}>
            <Typography variant="body1" className={classes.author}>
              — CORE Coaching &amp; Consulting Team
            </Typography>
          </Fade>
        </PageWrapper>
      </Container>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  heading: {
    textAlign: "center",
    borderTop: "1px solid lightgray",
    borderBottom: "1px solid lightgray",
    padding: 25,
    marginBottom: 0,
  },
  subheading: {
    marginBottom: 50,
    fontStyle: "italic",
    fontSize: 14,
    display: "block",
    textAlign: "center",
  },
  author: {
    textAlign: "right",
    fontStyle: "italic",
    fontSize: 18,
    marginTop: 25,
  },
}));

export default Body;
