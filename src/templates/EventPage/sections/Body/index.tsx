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
import { EventType } from "types";
import { Markdown } from "components";

type BodyProps = Pick<EventType, "title" | "subtitle" | "description">;

const Body: React.FC<BodyProps> = ({ title, subtitle, description }) => {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="body1" className={classes.subtitle}>
        {subtitle}
      </Typography>
      <div className={classes.descriptionWrapper}>
        <Markdown text={description} />
      </div>
    </section>
  );
};

export default Body;

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "40px 0",
  },
  subtitle: {
    backgroundColor: theme.palette.grey[400],
    color: "white",
    fontWeight: 500,
    margin: "50px 0",
    padding: 25,
  },
  descriptionWrapper: {
    padding: 25,
  },
}));
