import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import parse from "html-react-parser";
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
import { Heading, Markdown } from "components";

type BenefitsProps = {
  benefits: string;
};

const Benefits: React.FC<BenefitsProps> = ({ benefits }) => {
  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={3} square className={classes.paper}>
        <Heading showLine textAlign="center" noMargin>
          Schedule a time with us if you:
        </Heading>
        <Markdown
          text={benefits}
          components={{
            li: (props) => (
              <ListItem>
                <ListItemIcon style={{ minWidth: 34 }}>
                  <ErrorOutlineIcon />
                </ListItemIcon>
                <ListItemText {...props} />
              </ListItem>
            ),
          }}
        />
      </Paper>
    </Container>
  );
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
