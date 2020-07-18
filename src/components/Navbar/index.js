import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Hidden,
  Drawer,
  IconButton,
} from "@material-ui/core";
import Link from "components/Link";
import MenuIcon from "@material-ui/icons/Menu";

const TEMP_DATA = [
  {
    label: "CORE Coaching",
    url: "/",
  },
  {
    label: "CORE Business",
    url: "/",
  },
  {
    label: "CORE Learning",
    url: "/",
  },
  {
    label: "Meet the Team",
    url: "/",
  },
];

const Navbar = (props) => {
  const [isOnTop, setOnTop] = React.useState(true);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    setOnTop(!window.scrollY);
    window.addEventListener("scroll", () => setOnTop(!window.scrollY), {
      passive: true,
    });
  }, []);

  const classes = useStyles({ isOnTop })();

  const renderNavContent = () => {
    return (
      <List className={classes.list}>
        {TEMP_DATA.map(({ label, url }, i) => {
          return (
            <ListItem
              key={i}
              className={classes.listItem}
              component={Link}
              to={url}
            >
              <Typography variant="body1" className={classes.text}>
                {label}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <AppBar component="nav" className={classes.nav}>
      <Toolbar className={classes.toolbar}>
        <Link to="/">LOGO HERE</Link>
        <Hidden xsDown>{renderNavContent()}</Hidden>
        <Hidden smUp>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {renderNavContent()}
          </Drawer>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

const useStyles = ({ isOnTop }) =>
  makeStyles((theme) => ({
    nav: {
      backgroundColor: isOnTop ? "#0000004d" : theme.palette.common.white,
      transition: "background-color 0.5s",
      position: "fixed",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      minHeight: "inherit",
      height: theme.spacing(9),
    },
    list: {
      display: "flex",
      justifyContent: "space-evenly",
      flexGrow: 1,
      padding: 0,
    },
    listItem: {
      width: "auto",
      paddingTop: 0,
      paddingBottom: 0,
      height: theme.spacing(9),
      whiteSpace: "nowrap",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
    text: {
      color: isOnTop ? theme.palette.common.white : theme.palette.text.primary,
      transition: "color 0.5s",
    },
    [theme.breakpoints.down("xs")]: {
      nav: {
        backgroundColor: theme.palette.common.white,
      },
      list: {
        justifyContent: "flex-start",
        flexDirection: "column",
      },
      text: {
        color: theme.palette.text.primary,
      },
    },
  }));
