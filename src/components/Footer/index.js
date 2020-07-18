import React from "react";
import { graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  Divider,
} from "@material-ui/core";
import Link from "components/Link";

const Footer = ({ email, phone1, phone2, address, link }) => {
  const classes = useStyles();

  const renderPhone = (phone) => {
    return (
      <div>
        <a href={`tel:${phone.replace(/\D/g, "")}`}>
          <Typography variant="body1">{phone}</Typography>
        </a>
      </div>
    );
  };

  return (
    <footer className={classes.footer}>
      <Container>
        <Grid container justify="space-between">
          <Grid item className={classes.leftSide}>
            {email && (
              <div>
                <a href={`mailto:${email}`}>
                  <Typography variant="body1">{email}</Typography>
                </a>
              </div>
            )}
            {phone1 && renderPhone(phone1)}
            {phone2 && renderPhone(phone2)}
          </Grid>
          <Grid item className={classes.rightSide}>
            {link && <Typography variant="body1">{link}</Typography>}
            {address &&
              address.split("\n").map((line, i) => (
                <Typography variant="body1" key={i}>
                  {line}
                </Typography>
              ))}
          </Grid>
        </Grid>
      </Container>
      <div className={classes.copyright}>
        <Typography variant="body1">
          © Core Coaching &amp; Consulting
        </Typography>
      </div>
    </footer>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    paddingTop: theme.spacing(3),
    backgroundColor: theme.palette.grey["400"],
  },
  leftSide: {
    "& p": {
      textDecoration: "underline",
      display: "inline",
    },
  },
  copyright: {
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    marginTop: theme.spacing(3),
    padding: `${theme.spacing(3)}px 0`,
    textAlign: "center",
    width: "100%",
  },
}));

export default Footer;
