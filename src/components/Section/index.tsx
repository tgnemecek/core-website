import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "components";

type SectionProps = {
  className?: string;
  backgroundColor?: string;
  small?: boolean;
  id?: string;
  noPadding?: boolean;
  noShadows?: boolean;
};

const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  backgroundColor = theme.palette.common.white,
  small = false,
  id = "",
  noPadding,
  noShadows,
}) => {
  const classes = useStyles({ backgroundColor, small, noPadding, noShadows })();

  return (
    <section className={`${classes.section} ${className}`} id={id}>
      {children}
    </section>
  );
};

export default Section;

type UseStylesProps = {
  backgroundColor: string;
  small: boolean;
  noPadding?: boolean;
  noShadows?: boolean;
};

const useStyles = ({
  backgroundColor,
  small,
  noPadding,
  noShadows,
}: UseStylesProps) =>
  makeStyles((theme) => ({
    section: {
      boxShadow: noShadows
        ? "none"
        : "inset 0px -10px 12px -3px rgba(0, 0, 0, 0.1)",
      padding: noPadding ? 0 : small ? "40px 0" : "120px 0",
      backgroundColor,
    },
  }));
