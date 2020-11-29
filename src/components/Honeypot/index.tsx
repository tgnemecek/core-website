import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, TextFieldProps } from "@material-ui/core";

const Honeypot: React.FC<TextFieldProps> = ({ value, onChange }) => {
  const classes = useStyles();
  return (
    <TextField
      autoComplete="off"
      className={classes.honeypot}
      name="honeypot"
      label="Please leave this blank"
      variant="filled"
      value={value}
      onChange={onChange}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  honeypot: {
    position: "absolute",
    height: 0,
    width: 0,
    overflow: "hidden",
    left: -9999,
    zIndex: -9999,
  },
}));

export default Honeypot;
