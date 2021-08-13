import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Markdown, Heading } from "components";
import EventContext from "../../EventContext";

const Body: React.FC = () => {
  const {
    event: { title, subtitle, description },
  } = React.useContext(EventContext)!;

  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Heading showLine>{title}</Heading>
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
    padding: "120px 0",
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
