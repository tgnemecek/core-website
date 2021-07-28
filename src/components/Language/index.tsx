import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Tooltip } from "@material-ui/core";
import { formatLanguage } from "utils";
import { Language } from "types";
import Flag from "./Flag";

type LanguageProps = {
  code: Language | Language[];
  showFlag?: boolean;
  showCode?: boolean;
  showLanguage?: boolean;
  separator?: React.ReactText;
  className?: string;
  flagSize?: number;
};

const Language: React.FC<LanguageProps> = ({
  code: rawCode,
  showFlag,
  showCode,
  showLanguage,
  className = "",
  flagSize,
}) => {
  const classes = useStyles();
  const codes = Array.isArray(rawCode) ? rawCode : [rawCode];

  return (
    <>
      {codes.map((code) => (
        <Tooltip
          key={code}
          title={
            <Typography variant="body1" className={classes.tooltip}>
              {formatLanguage(code)}
            </Typography>
          }
        >
          <span className={`${className} ${classes.languageWrapper}`}>
            {showFlag && (
              <Flag
                code={code}
                className={classes.flag}
                width={flagSize}
                height={flagSize}
              />
            )}
            {showCode && (
              <Typography variant="body1" className={classes.text}>
                {code}
              </Typography>
            )}
            {showLanguage && (
              <Typography variant="body1" className={classes.text}>
                {formatLanguage(code)}
              </Typography>
            )}
          </span>
        </Tooltip>
      ))}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  tooltip: {
    color: "white",
    fontSize: "0.9rem",
  },
  languageWrapper: {
    display: "inline-flex",
  },
  flag: {
    marginRight: 5,
  },
  text: {
    fontSize: "0.9rem",
    marginRight: 5,
  },
}));

export default Language;
