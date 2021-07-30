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
                <ListItemIcon>
                  <ErrorOutlineIcon />
                </ListItemIcon>
                <ListItemText {...props} />
              </ListItem>
            ),
          }}
        />
        {/* {parse(benefits, {
          replace: ({ name, children }: any) => {
            if (name === "ul")
              return (
                <List>
                  {children.map(({ name, children }: any, i: number) => {
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
        })} */}
      </Paper>
    </Container>
  );
};

export default Benefits;

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 750,
    margin: "50px auto",
    "& h2": {
      padding: theme.spacing(2),
      textAlign: "center",
    },
  },
}));
