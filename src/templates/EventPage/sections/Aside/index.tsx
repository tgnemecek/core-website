import React from "react";
import { format } from "date-fns";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getTintedBackground, isEventValid, useGeneralSettings } from "utils";
import { Section } from "components";
import EventContext from "../../EventContext";
import FeatureList from "../../FeatureList";

const Aside: React.FC = () => {
  const {
    event: { date, tickets },
    setTicketsModalOpen,
    alreadyPurchased,
    loading,
  } = React.useContext(EventContext)!;

  const classes = useStyles();
  const { refundPolicy } = useGeneralSettings();

  return (
    <>
      <aside className={classes.aside}>
        <Card raised className={classes.card}>
          <CardContent>
            <Typography variant="subtitle1">
              {format(date, "MMMM d, yyyy")}
            </Typography>
            <FeatureList />
            <Typography variant="body1" className={classes.refundHeader}>
              Refund Policy
            </Typography>
            <Typography variant="body1" className={classes.refund}>
              {refundPolicy}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              className={classes.buy}
              onClick={() => setTicketsModalOpen(true)}
              disabled={
                alreadyPurchased || loading || !isEventValid({ date, tickets })
              }
            >
              {alreadyPurchased ? "Ticket Purchased" : "Buy"}
            </Button>
          </CardActions>
        </Card>
      </aside>
      <Section noShadows noPadding>
        <div className={classes.divider} />
      </Section>
    </>
  );
};

export default Aside;

const useStyles = makeStyles((theme) => ({
  aside: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: "25px 0",
    ...getTintedBackground(),
    boxShadow: "inset 27px 0px 14px -17px rgb(0 0 0 / 24%)",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "none",
      background: "none",
    },
  },
  card: {
    width: "calc(100% - 50px)",
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
      boxShadow: "none",
    },
  },
  divider: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      paddingBottom: theme.spacing(6),
    },
  },
  refundHeader: {
    fontWeight: 500,
    fontSize: "0.9rem",
  },
  refund: {
    fontSize: "0.9rem",
    marginBottom: theme.spacing(5),
  },
  buy: {
    backgroundColor: theme.palette.success.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));
