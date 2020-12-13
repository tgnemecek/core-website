import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Tooltip,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { formatLanguage } from "utils";
import { LanguageType } from "types";
import Flag from "./Flag";

type LanguageProps = {
  code: LanguageType | LanguageType[];
  showFlag?: boolean;
  showCode?: boolean;
  showLanguage?: boolean;
  separator?: React.ReactText;
  className?: string;
};

const Language: React.FC<LanguageProps> = ({
  code: rawCode,
  showFlag,
  showCode,
  showLanguage,
  className = "",
}) => {
  const classes = useStyles();
  const codes = Array.isArray(rawCode) ? rawCode : [rawCode];

  return (
    <>
      {codes.map((code) => (
        <Tooltip title={formatLanguage(code)}>
          <span
            key={code}
            className={`${className} ${classes.languageWrapper}`}
          >
            {showFlag && <Flag code={code} className={classes.flag} />}
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
