import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal as MaterialModal } from "@material-ui/core";
import { ModalProps } from "@material-ui/core/Modal/Modal";

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <MaterialModal {...props} className={classes.modal}>
      {children}
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
