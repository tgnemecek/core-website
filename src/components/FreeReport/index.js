import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid } from "@material-ui/core";

const FreeReport = ({ reportText, downloadLink }) => {
  const classes = useStyles();

  if (!downloadLink) return null;

  return (
    <div className={classes.reportWrapper}>
      <Grid
        container
        justify="center"
        align="center"
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

FreeReport.prototypes = {
  reportText: PropTypes.string.isRequired,
  downloadLink: PropTypes.string,
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
