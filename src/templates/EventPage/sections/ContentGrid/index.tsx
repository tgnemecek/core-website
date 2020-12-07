import React from "react";
import moment from "moment";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ContentGrid: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Container>
      <section className={classes.section}>{children}</section>
    </Container>
  );
};

export default ContentGrid;

const useStyles = makeStyles((theme) => ({
  section: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
  },
}));
