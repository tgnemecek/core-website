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
import Link from "src/components/Link/Link";
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

const NavBar = (props) => {
  const classes = useStyles();
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

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
              {label}
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <AppBar
      position="sticky"
      component="nav"
      className={classes.nav}
      color="primary"
    >
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

export default NavBar;

const useStyles = makeStyles((theme) => ({
  nav: {},
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
  [theme.breakpoints.down("xs")]: {
    list: {
      justifyContent: "flex-start",
      flexDirection: "column",
    },
  },
}));
