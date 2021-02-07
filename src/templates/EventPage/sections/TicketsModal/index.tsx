import React from "react";
import moment from "moment";
import { graphql, PageProps } from "gatsby";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  Typography,
  CircularProgress,
  Modal,
  Dialog,
  IconButton,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { TicketType } from "types";
import EventContext from "../../EventContext";
import FeatureList from "../../FeatureList";
import TicketsAside from "./TicketsAside";
import TicketsMain from "./TicketsMain";
import CheckoutForm from "./CheckoutForm";
import SuccessMessage from "./SuccessMessage";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);

type TicketsModalProps = {
  open: boolean;
};

type StageType =
  | "chooseTicket"
  | "checkoutForm"
  | "processingPayment"
  | "success"
  | "failed";

const TicketsModal: React.FC<TicketsModalProps> = ({ open }) => {
  const { setTicketsModalOpen } = React.useContext(EventContext);

  const [stage, setStage] = React.useState<StageType>("chooseTicket");
  const [chosenTicket, setChosenTicket] = React.useState<TicketType>();

  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={() => setTicketsModalOpen(false)}
      maxWidth="md"
    >
      <Paper className={classes.paper} square elevation={10}>
        <IconButton
          className={classes.closeIcon}
          onClick={() => setTicketsModalOpen(false)}
        >
          <CloseIcon />
        </IconButton>
        <TicketsAside />
        {stage === "chooseTicket" && (
          <TicketsMain
            goToCheckout={() => setStage("checkoutForm")}
            setChosenTicket={setChosenTicket}
          />
        )}
        {stage === "checkoutForm" && chosenTicket && (
          <Elements stripe={stripePromise}>
            <CheckoutForm
              chosenTicket={chosenTicket}
              goToSuccess={() => setStage("success")}
              goToFailed={() => setStage("failed")}
            />
          </Elements>
        )}
        {stage === "success" && <SuccessMessage />}
      </Paper>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    padding: 10,
  },
}));

export default TicketsModal;
