import React from "react";
import { Container } from "@material-ui/core";
import { Section } from "components";
import { makeStyles } from "@material-ui/core/styles";

type ContentGridProps = {
  body: React.ReactNode;
  aside: React.ReactNode;
};
const ContentGrid: React.FC<ContentGridProps> = ({ body, aside }) => {
  const classes = useStyles();

  return (
    <Section noPadding>
      <Container className={classes.container}>
        <div className={classes.body}>{body}</div>
        <div className={classes.aside}>{aside}</div>
      </Container>
    </Section>
  );
};

export default ContentGrid;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },
  body: {},
  aside: {
    [theme.breakpoints.down("sm")]: {
      gridRow: 1,
    },
  },
}));
