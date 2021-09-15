import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type HeadingProps = {
  subheading?: string;
  extra?: string;
  showLine?: boolean;
  textAlign?: "left" | "center";
  hidden?: boolean;
  noMargin?: boolean;
};

const Heading: React.FC<HeadingProps> = ({
  children,
  subheading,
  extra,
  showLine,
  textAlign,
  hidden,
  noMargin,
}) => {
  const classes = useStyles({ showLine, subheading, noMargin })();

  return (
    <>
      <Typography
        variant={hidden ? "srOnly" : "h2"}
        className={classes.h2}
        align={textAlign}
      >
        {children}
        {extra && <Typography className={classes.extra}>{extra}</Typography>}
      </Typography>
      {subheading && (
        <Typography
          variant="subtitle1"
          className={classes.subheading}
          align={textAlign}
        >
          {subheading}
        </Typography>
      )}
    </>
  );
};

export default Heading;

const marginBottom = 35;

const useStyles = ({ showLine, subheading, noMargin }: Partial<HeadingProps>) =>
  makeStyles((theme) => {
    return {
      h2: {
        borderBottom: showLine ? `2px solid ${theme.palette.primary.main}` : "",
        marginBottom: subheading || noMargin ? 0 : marginBottom,
      },
      extra: {
        fontSize: 14,
        display: "inline",
        marginLeft: 25,
        fontStyle: "italic",
      },
      subheading: {
        marginBottom: subheading && !noMargin ? marginBottom : 0,
      },
    };
  });
