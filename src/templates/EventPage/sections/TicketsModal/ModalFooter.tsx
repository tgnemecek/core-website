import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const ModalFooter: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.footer}>{children}</div>;
};

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    height: 80,
    boxShadow: "0px -9px 15px -5px rgba(0,0,0,0.1)",
    "& > *": {
      margin: "auto",
    },
  },
}));
export default ModalFooter;
