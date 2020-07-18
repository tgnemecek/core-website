import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Divider,
} from "@material-ui/core";
import Link from "components/Link";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import LinkIcon from "@material-ui/icons/Link";

const Footer = ({ email, phone1, phone2, address, link }) => {
  const classes = useStyles();

  const renderPhone = (phone) => {
    return (
      <ListItem component="a" href={`tel:${phone.replace(/\D/g, "")}`}>
        <ListItemIcon>
          <PhoneIphoneIcon />
        </ListItemIcon>
        <Typography variant="body1">{phone}</Typography>
      </ListItem>
    );
  };

  return (
    <footer className={classes.footer}>
      <Container>
        <Grid container justify="space-between">
          <Grid item className={classes.leftSide}>
            <List>
              {email && (
                <ListItem component="a" href={`mailto:${email}`}>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <Typography variant="body1">{email}</Typography>
                </ListItem>
              )}
              {link && (
                <ListItem component="a" href={link}>
                  <ListItemIcon>
                    <LinkIcon />
                  </ListItemIcon>
                  <Typography variant="body1">{link}</Typography>
                </ListItem>
              )}
              {phone1 && renderPhone(phone1)}
              {phone2 && renderPhone(phone2)}
            </List>
          </Grid>
          <Grid item className={classes.rightSide}>
            <List>
              {address && (
                <ListItem>
                  <List>
                    {address.split("\n").map((line, i) => (
                      <ListItem key={i}>
                        <Typography variant="body1">{line}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </ListItem>
              )}
            </List>
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
    paddingTop: 100,
    // backgroundColor: theme.palette.grey[200],
    backgroundColor: theme.palette.primary.main,
  },
  leftSide: {
    "& p": {
      textDecoration: "underline",
      display: "inline",
    },
  },
  rightSide: {
    "& p": {
      textAlign: "right",
      width: "100%",
    },
  },
  copyright: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    marginTop: 200,
    padding: `${theme.spacing(3)}px 0`,
    textAlign: "center",
    width: "100%",
  },
}));

export default Footer;
