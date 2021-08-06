import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { Section } from "components";
import { Link } from "gatsby";
import streak from "src/img/streak1.jpg";
import { About } from "types";

type AboutSectionProps = {
  about: About;
};

const AboutSection: React.FC<AboutSectionProps> = ({
  about: { text, image },
}) => {
  const classes = useStyles();

  return (
    <Section>
      <Typography variant="srOnly" component="h2">
        AboutSection
      </Typography>
      <div className={classes.gridWrapper}>
        <Container className={classes.aboutGrid}>
          <div className={classes.textWrapper}>
            <Fade left>
              <Typography variant="body2" className={classes.text}>
                {text}
              </Typography>
              <div>
                <Link to="/team" className={classes.link}>
                  <Typography variant="body1">Meet the Team</Typography>
                </Link>
              </div>
            </Fade>
          </div>
          <div className={classes.imgWrapper}>
            <img className={classes.image} src={image} alt="CORE Logo" />
          </div>
        </Container>
        <div className={classes.bg} />
      </div>
    </Section>
  );
};

export default AboutSection;

const useStyles = makeStyles((theme) => ({
  gridWrapper: {
    position: "relative",
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    justifyItems: "center",
    justifyContent: "center",
  },
  textWrapper: {
    padding: "25px 0",
    margin: "auto",
    zIndex: 1,
  },
  text: {
    fontSize: 22,
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, #a6b9df 0%, #a6b9df 20%, rgba(255,255,255,0) 60%)",
  },
  link: {
    "& p": {
      display: "inline",
      textDecoration: "underline",
    },
  },
  imgWrapper: {},
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
