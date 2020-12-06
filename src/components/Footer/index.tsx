import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import LinkIcon from "@material-ui/icons/Link";
import { useContactInfo } from "utils";

const Footer: React.FC = () => {
  return null;
  // const { email, phone1, phone2, address, link } = useContactInfo();
  // const classes = useStyles();

  // const renderPhone = (phone: string) => {
  //   const href = `tel:${phone.replace(/\D/g, "")}`;
  //   return (
  //     <ListItem>
  //       <ListItemIcon>
  //         <a href={href}>
  //           <PhoneIphoneIcon className={classes.icon} />
  //         </a>
  //       </ListItemIcon>
  //       <Typography component="a" href={href} variant="body1">
  //         {phone}
  //       </Typography>
  //     </ListItem>
  //   );
  // };

  // return (
  //   <footer className={classes.footer}>
  //     <Container>
  //       <Grid container justify="space-between">
  //         <Grid item className={classes.leftSide} xs={12} md={6}>
  //           <List>
  //             {email && (
  //               <ListItem>
  //                 <ListItemIcon>
  //                   <a href={`mailto:${email}`}>
  //                     <EmailIcon className={classes.icon} />
  //                   </a>
  //                 </ListItemIcon>
  //                 <Typography
  //                   variant="body1"
  //                   component="a"
  //                   href={`mailto:${email}`}
  //                 >
  //                   {email}
  //                 </Typography>
  //               </ListItem>
  //             )}
  //             {link && (
  //               <ListItem>
  //                 <ListItemIcon>
  //                   <a href={link}>
  //                     <LinkIcon className={classes.icon} />
  //                   </a>
  //                 </ListItemIcon>
  //                 <Typography component="a" href={link} variant="body1">
  //                   {link}
  //                 </Typography>
  //               </ListItem>
  //             )}
  //             {phone1 && renderPhone(phone1)}
  //             {phone2 && renderPhone(phone2)}
  //           </List>
  //         </Grid>
  //         <Grid item className={classes.rightSide} xs={12} md={6}>
  //           {address && (
  //             <List>
  //               {address.split("\n").map((line, i) => (
  //                 <ListItem key={i}>
  //                   <Typography variant="body1">{line}</Typography>
  //                 </ListItem>
  //               ))}
  //             </List>
  //           )}
  //         </Grid>
  //       </Grid>
  //     </Container>
  //     <div className={classes.copyright}>
  //       <Typography variant="body1">
  //         © Core Coaching &amp; Consulting
  //       </Typography>
  //     </div>
  //   </footer>
  // );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    paddingTop: 100,
    backgroundColor: theme.palette.primary.main,
  },
  leftSide: {
    "& a": {
      textDecoration: "underline",
      display: "inline",
      color: theme.palette.common.white,
    },
  },
  rightSide: {
    marginBottom: 100,
    "& p": {
      textAlign: "right",
      width: "100%",
      color: theme.palette.common.white,
      [theme.breakpoints.down("sm")]: {
        textAlign: "left",
      },
    },
  },
  icon: {
    color: theme.palette.common.white,
  },
  copyright: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: `${theme.spacing(3)}px 0`,
    textAlign: "center",
    width: "100%",
    "& p": {
      color: theme.palette.common.white,
    },
  },
}));

export default Footer;
