import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal as MaterialModal } from "@material-ui/core";

const Modal = (props) => {
  const classes = useStyles();

  return (
    <MaterialModal {...props} className={classes.modal}>
      {props.children}
    </MaterialModal>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      outline: "none",
    },
  },
}));

export default Modal;
