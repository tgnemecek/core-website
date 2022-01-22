import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { Section, Link, Heading } from "components";
import { About } from "types";

type AboutSectionProps = {
  about: About;
};

const AboutSection: React.FC<AboutSectionProps> = ({ about: { text } }) => {
  const classes = useStyles();

  return (
    <Section className={classes.section}>
      <div className={classes.gridWrapper}>
        <Container className={classes.aboutGrid}>
          <div className={classes.textWrapper}>
            <Fade left>
              <Heading>About Us</Heading>
              <Typography variant="body2" className={classes.text}>
                {text}
              </Typography>
              <div>
                <Link to="/team">Meet the Team</Link>
              </div>
            </Fade>
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default AboutSection;

const useStyles = makeStyles((theme) => ({
  section: {
    background:
      "linear-gradient(90deg, #b9c9ea 0%, #b9c9ea 20%, rgba(255,255,255,0) 60%)",
  },
  gridWrapper: {
    position: "relative",
  },
  aboutGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textWrapper: {
    maxWidth: 650,
    padding: "25px 0",
    margin: "auto",
    zIndex: 1,
  },
  text: {
    fontSize: 20,
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
  link: {
    "& p": {
      display: "inline",
      textDecoration: "underline",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    maxWidth: 400,
    maxHeight: 400,
    minHeight: 250,
    minWidth: 250,
    objectFit: "contain",
  },
}));
