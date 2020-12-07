import React from "react";
import { Container } from "@material-ui/core";
import { Section } from "components";
import { makeStyles } from "@material-ui/core/styles";

const ContentGrid: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Section>
      <Container className={classes.container}>{children}</Container>
    </Section>
  );
};

export default ContentGrid;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
  },
}));
