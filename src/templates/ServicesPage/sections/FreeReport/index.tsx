import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid } from "@material-ui/core";

type FreeReportProps = {
  reportText: string;
  downloadLink?: string;
};

const FreeReport: React.FC<FreeReportProps> = ({
  reportText,
  downloadLink,
}) => {
  const classes = useStyles();

  if (!downloadLink) return null;

  return (
    <div className={classes.reportWrapper}>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={5}
        className={classes.reportGridContainer}
      >
        <Grid item>
          <Typography
            variant="body2"
            align="center"
            className={classes.reportText}
          >
            {reportText}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            className={classes.reportButton}
            color="secondary"
            variant="contained"
            component="a"
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            DOWNLOAD PDF
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FreeReport;

const useStyles = makeStyles((theme) => ({
  reportWrapper: {
    padding: "50px 0",
  },
  reportGridContainer: {
    padding: "50px",
    backgroundColor: theme.palette.grey[700],
  },
  reportText: {
    color: "white",
  },
  reportButton: {
    color: "white",
  },
}));
