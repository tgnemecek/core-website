import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const PageWrapper: React.FC = ({ children }) => {
  const { className } = useStyles();

  return <div className={className}>{children}</div>;
};

const useStyles = makeStyles(() => ({
  className: {
    width: "100%",
    maxWidth: 700,
    margin: "auto",
    textAlign: "justify",
  },
}));

export default PageWrapper;
