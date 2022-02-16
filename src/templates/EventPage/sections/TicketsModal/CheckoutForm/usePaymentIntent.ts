import React from "react";
import moment from "moment-timezone";
import { useSnackbar } from "notistack";
import { Ticket, API } from "types";
import EventContext from "../../../EventContext";

const SERVER_ERROR_MSG = "Something went wrong. Please try again later.";

type UsePaymentIntent = (props: {
  ticket: Ticket;
  setClientSecret: (secret: string) => void;
}) => void;

const usePaymentIntent: UsePaymentIntent = ({ ticket, setClientSecret }) => {
  const {
    setTicketsModalOpen,
    event: { title },
  } = React.useContext(EventContext)!;
  const { enqueueSnackbar } = useSnackbar();

  const createPaymentIntent = async () => {
    const body: API.CreatePaymentIntentBody = {
      title,
      ticketId: ticket.id,
      timezone: moment.tz.guess(),
    };

    try {
      const res = await fetch("/.netlify/functions/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    } catch (err) {
      enqueueSnackbar(SERVER_ERROR_MSG, {
        variant: "error",
      });
      setTicketsModalOpen(false);
    }
  };

  React.useEffect(() => {
    if (ticket.price) {
      createPaymentIntent();
    }
  }, [ticket]);
};

export default usePaymentIntent;
