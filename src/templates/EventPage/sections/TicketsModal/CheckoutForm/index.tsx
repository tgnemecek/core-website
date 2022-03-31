import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Ticket } from "types";
import ModalFooter from "../ModalFooter";
import FormInput from "./FormInput";
import useFormSubmit from "./useFormSubmit";
import usePaymentIntent from "./usePaymentIntent";

import type { FormState, FormErrors } from "./types";

const CARD_EMPTY_MSG = "Please fill all required card fields.";

type CheckoutFormProps = {
  ticket: Ticket;
  goToSuccess: () => void;
  goToFailed: () => void;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  ticket,
  goToSuccess,
  goToFailed,
}) => {
  const [clientSecret, setClientSecret] = React.useState("");

  const [formState, setFormState] = React.useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [hiddenCardError, setHiddenCardError] = React.useState(
    ticket.price ? CARD_EMPTY_MSG : ""
  );

  const [formErrors, setFormErrors] = React.useState<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    card: "",
  });

  const handleSubmit = useFormSubmit({
    formState,
    setFormErrors,
    hiddenCardError,
    clientSecret,
    ticket,
    goToFailed,
    goToSuccess,
  });

  usePaymentIntent({
    ticket,
    setClientSecret,
  });

  const handleChange = (key: keyof FormState) => {
    return (value: string) => {
      let formattedValue: string;
      if (["firstName", "lastName"].includes(key)) {
        formattedValue = value.replace(/_/g, "");
      }
      setFormErrors((prev) => ({ ...prev, [key]: "" }));
      setFormState((prev) => ({
        ...prev,
        [key]: formattedValue !== undefined ? formattedValue : value,
      }));
    };
  };

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.formFields}>
        <Typography variant="body1" className={classes.poweredByStripe}>
          Powered by Stripe ©
        </Typography>
        <div className={classes.halfDivider}>
          <FormInput
            label="First Name"
            type="text"
            value={formState.firstName}
            onChange={handleChange("firstName")}
            error={formErrors.firstName}
          />
          <FormInput
            label="Last Name"
            type="text"
            value={formState.lastName}
            onChange={handleChange("lastName")}
            error={formErrors.lastName}
          />
        </div>
        <FormInput
          label="Email"
          type="email"
          value={formState.email}
          onChange={handleChange("email")}
          error={formErrors.email}
        />
        {Boolean(ticket.price) && (
          <FormInput
            type="card"
            label="Card Details"
            error={formErrors.card}
            onChange={({ error, complete }) => {
              let errorMessage = "";
              if (!complete) errorMessage = CARD_EMPTY_MSG;
              if (error) errorMessage = error.message;
              setFormErrors((prev) => ({ ...prev, card: "" }));
              setHiddenCardError(errorMessage);
            }}
          />
        )}
      </div>
      <ModalFooter>
        <Button type="submit" color="primary" variant="contained">
          {ticket.price ? `Pay $${ticket.price}` : "Sign up"}
        </Button>
      </ModalFooter>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  form: {
    display: "grid",
    gridTemplateRows: "1fr auto",
    position: "relative",
  },
  formFields: {
    width: "calc(100% - 100px)",
    margin: "auto",
    padding: 15,
    boxShadow: theme.shadows[2],
    position: "relative",
  },
  poweredByStripe: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    textAlign: "center",
    fontSize: "0.8rem",
    fontStyle: "italic",
    color: theme.palette.grey[400],
  },
  halfDivider: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
}));

export default CheckoutForm;
