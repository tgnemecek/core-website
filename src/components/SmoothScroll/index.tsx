import React from "react";
import { makeStyles } from "@material-ui/core/styles";

type SmoothScrollProps = {
  targetId: string;
  className?: string;
};

const SmoothScroll: React.FC<SmoothScrollProps> = ({
  children,
  targetId,
  className = "",
}) => {
  const classes = useStyles();

  const scroll = () => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const { offsetTop } = el;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <button onClick={scroll} className={`${classes.button} ${className}`}>
      {children}
    </button>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
  },
}));

export default SmoothScroll;
