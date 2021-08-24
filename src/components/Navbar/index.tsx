import React from "react";
import { Link } from "gatsby";
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
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { theme } from "components";
import { useNavigation, useGeneralSettings } from "utils";
import LogoIcon from "./LogoIcon";

const Navbar: React.FC = () => {
  const { logo } = useGeneralSettings();
  const { links } = useNavigation();
  const [isOnTop, setOnTop] = React.useState(true);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isOnTop })();

  const onScroll = () => {
    setOnTop(!window.scrollY);
  };

  const getPath = () => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
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
    return (
      <List className={classes.list}>
        {links.map(({ label, url, description }, i) => {
          return (
            <Tooltip
              key={i}
              title={description ? <Typography>{description}</Typography> : ""}
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
        {getPath() === "/" ? (
          <a href="#hero">
            <LogoIcon />
          </a>
        ) : (
          <Link to="/">
            <LogoIcon />
          </Link>
        )}
        <Hidden smDown>{renderNavContent()}</Hidden>
        <Box display={{ md: "none" }}>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

type UseStylesProps = {
  isOnTop: boolean;
};

const useStyles = ({ isOnTop }: UseStylesProps) =>
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

export default Navbar;
