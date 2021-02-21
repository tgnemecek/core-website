import React from "react";
import moment from "moment-timezone";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSnackbar } from "notistack";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TicketType } from "types";
import { verifyEmail } from "utils";
import EventContext from "../../../EventContext";
import ModalFooter from "../ModalFooter";
import FormInput from "./FormInput";

const serverErrorMessage = "Something went wrong. Please try again later.";
const cardIncompleteErrorMessage = "Please fill all required card fields.";

type CheckoutFormProps = {
  chosenTicket: TicketType;
  goToSuccess: () => void;
  goToFailed: () => void;
};

type FormState = Record<"firstName" | "lastName" | "email", string>;
type FormErrorsType = Record<keyof FormState | "card", string>;

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  chosenTicket,
  goToSuccess,
  goToFailed,
}) => {
  const {
    setTicketsModalOpen,
    setAlreadyPurchased,
    setLoading,
    event: { meetingId },
  } = React.useContext(EventContext);

  const [clientSecret, setClientSecret] = React.useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { enqueueSnackbar } = useSnackbar();

  const [formState, setFormState] = React.useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [hiddenCardError, setHiddenCardError] = React.useState(
    cardIncompleteErrorMessage
  );

  const [formErrors, setFormErrors] = React.useState<FormErrorsType>({
    firstName: "",
    lastName: "",
    email: "",
    card: "",
  });

  const createPaymentIntent = async () => {
    try {
      const res = await fetch("/.netlify/functions/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId: chosenTicket.id,
          timezone: moment.tz.guess(),
        }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    } catch (err) {
      enqueueSnackbar(serverErrorMessage, {
        variant: "error",
      });
      setTicketsModalOpen(false);
    }
  };

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

  const hasErrors = () => {
    const newErrors: Partial<FormErrorsType> = (Object.keys(
      formState
    ) as (keyof FormState)[])
      .filter((key) => !formState[key])
      .reduce((acc, key) => {
        return { ...acc, [key]: "This is a required field" };
      }, {});

    if (!newErrors.email && !verifyEmail(formState.email)) {
      newErrors.email = "The provided email address is invalid.";
    }

    if (hiddenCardError) {
      newErrors.card = hiddenCardError;
    }

    setFormErrors({
      ...newErrors,
      card: newErrors.card || "",
    } as FormErrorsType);

    return Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hasErrors()) return;
    setLoading(true);

    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: formState.email,
            name: `${formState.firstName}_${formState.lastName}`,
          },
        },
      });

      if (payload.error) {
        goToFailed();
      } else {
        setAlreadyPurchased(true);
        goToSuccess();
      }
    } catch (err) {
      goToFailed();
    }
    setLoading(false);
  };

  React.useEffect(() => {
    createPaymentIntent();
  }, []);

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
        <FormInput
          type="card"
          label="Card Details"
          error={formErrors.card}
          onChange={({ error, complete }) => {
            let errorMessage = "";
            if (!complete) errorMessage = cardIncompleteErrorMessage;
            if (error) errorMessage = error.message;
            setFormErrors((prev) => ({ ...prev, card: "" }));
            setHiddenCardError(errorMessage);
          }}
        />
      </div>
      <ModalFooter>
        <Button type="submit" color="primary" variant="contained">
          Pay ${chosenTicket.price}
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
