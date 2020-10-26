import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { Link, graphql } from "gatsby";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import Section from "components/Section";

const Benefits = ({ benefits, title }) => {
  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={3} square className={classes.paper}>
        <Typography variant="h2">{title}</Typography>
        {parse(benefits, {
          replace: ({ name, children }) => {
            if (name === "ul")
              return (
                <List>
                  {children.map(({ name, children }, i) => {
                    if (name === "li")
                      return (
                        <ListItem key={i}>
                          <ListItemIcon>
                            <ErrorOutlineIcon />
                          </ListItemIcon>
                          <ListItemText primary={children[0].data} />
                        </ListItem>
                      );
                  })}
                </List>
              );
          },
        })}
      </Paper>
    </Container>
  );
};

Benefits.prototypes = {
  benefits: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Benefits;

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 700,
    margin: "50px auto",
    "& h2": {
      padding: theme.spacing(2),
      textAlign: "center",
    },
  },
}));
