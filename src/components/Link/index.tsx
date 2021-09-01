import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  italic?: boolean;
  color?: string;
  style?: React.CSSProperties;
};

const Link: React.FC<LinkProps> = ({
  children,
  to,
  color,
  italic,
  style,
  ...linkProps
}) => {
  const { className } = useStyles({ color, italic })();

  return (
    <GatsbyLink to={to} className={className} style={style} {...linkProps}>
      <Typography variant="body1">{children}</Typography>
    </GatsbyLink>
  );
};

type UseStylesProps = {
  color?: string;
  italic?: boolean;
};

const useStyles = ({ color, italic }: UseStylesProps) =>
  makeStyles((theme) => ({
    className: {
      "& p": {
        display: "inline",
        textDecoration: "underline",
        color: color || theme.palette.primary.main,
        fontStyle: italic ? "italic" : "inherit",
      },
    },
  }));

export default Link;
