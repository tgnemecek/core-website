import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import leadingReport from "src/downloads/free-reports/leading.pdf";
import coachingReport from "src/downloads/free-reports/coaching.pdf";
import communityReport from "src/downloads/free-reports/community.pdf";
import businessReport from "src/downloads/free-reports/business.pdf";
import { ServiceName } from "types";

type FreeReportProps = {
  service: ServiceName;
};

const FreeReport: React.FC<FreeReportProps> = ({ service }) => {
  const classes = useStyles();

  const getReportText = () => {
    switch (service) {
      case "leading":
      case "coaching":
        return "Get a Free Leader Compass Report!";
      case "business":
        return "Get a Free Business Report";
      case "community":
        return "Free Report on How the Community Pays it Forward";
      default:
        throw new Error(
          `Service name unrecognized in getReportText(): ${service}`
        );
    }
  };

  const getReportLink = () => {
    switch (service) {
      case "leading":
        return leadingReport;
      case "coaching":
        return coachingReport;
      case "community":
        return communityReport;
      case "business":
        return businessReport;
      default:
        throw new Error(
          `Service name unrecognized in getReportLink(): ${service}`
        );
    }
  };

  const reportText = getReportText();
  const downloadLink = getReportLink();

  if (!downloadLink) return null;

  return (
    <div className={classes.reportWrapper}>
      <Grid
        container
        justifyContent="center"
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
