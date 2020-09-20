import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Hidden,
  Drawer,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Link } from "gatsby";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "src/img/logo.png";
import { theme } from "components/theme";

const Navbar = ({ path, pages }) => {
  const [isOnTop, setOnTop] = React.useState(true);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isOnTop })();

  const onScroll = () => {
    setOnTop(!window.scrollY);
  };

  React.useEffect(() => {
    setOnTop(!window.scrollY);
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const renderNavContent = () => {
    const Test = (props) => <div {...props} className={classes.tooltip}></div>;
    return (
      <List className={classes.list}>
        {pages.map(({ label, url, description }, i) => {
          return (
            <Tooltip
              key={i}
              title={<Typography>{description}</Typography>}
              PopperProps={{
                className: `MuiTooltip-popper MuiTooltip-popperArrow ${classes.tooltip}`,
              }}
              placement={isMobile ? "left" : "bottom"}
              arrow
            >
              <ListItem className={classes.listItem} component={Link} to={url}>
                <Typography variant="body1" className={classes.text}>
                  {label}
                </Typography>
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
    );
  };

  return (
    <AppBar component="nav" className={classes.nav}>
      <Toolbar className={classes.toolbar}>
        {path === "/" ? (
          <a href="#hero">
            <img src={logo} alt="Company Logo" className={classes.logo} />
          </a>
        ) : (
          <Link to="/">
            <img src={logo} alt="Company Logo" className={classes.logo} />
          </Link>
        )}
        <Hidden smDown>{renderNavContent()}</Hidden>
        <Hidden mdUp>
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
      backgroundColor: isOnTop ? "#000000c7" : theme.palette.common.white,
      transition: "background-color 0.5s",
      position: "fixed",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      minHeight: "inherit",
      height: theme.spacing(9),
    },
    logo: {
      width: "50px",
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
    tooltip: {
      marginTop: "-14px",
      "& p": {
        fontSize: "15px",
        color: "white",
        textAlign: "center",
      },
    },
    text: {
      color: isOnTop ? theme.palette.common.white : theme.palette.text.primary,
      transition: "color 0.5s",
    },
    [theme.breakpoints.down("sm")]: {
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
      tooltip: {
        marginTop: 0,
      },
    },
  }));
