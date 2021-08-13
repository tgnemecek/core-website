import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

type BenefitsProps = {
  benefits: string;
};

const Benefits: React.FC<BenefitsProps> = ({ benefits }) => {
  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={3} square className={classes.paper}>
<<<<<<< HEAD
        <Heading showLine textAlign="center" noMargin>
          Schedule a time with us if you:
        </Heading>
        <Markdown
          text={benefits}
          components={{
            li: (props: any) => (
              <ListItem>
                <ListItemIcon style={{ minWidth: 34 }}>
                  <ErrorOutlineIcon />
                </ListItemIcon>
                <ListItemText {...props} />
              </ListItem>
            ),
          }}
        />
=======
        <Typography variant="h2">Schedule a time with us if you:</Typography>
        {parse(benefits, {
          replace: ({ name, children }) => {
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
        })}
>>>>>>> @{-1}
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
