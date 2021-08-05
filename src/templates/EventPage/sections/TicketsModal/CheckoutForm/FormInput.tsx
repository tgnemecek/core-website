import React from "react";
import { CardElement, CardElementProps } from "@stripe/react-stripe-js";

import { makeStyles } from "@material-ui/core/styles";

type OnChange<T> = T extends "card"
  ? CardElementProps["onChange"]
  : (value: string) => void;

type FormInputProps<T = unknown> = {
  type?: T;
  onChange?: OnChange<T>;
  value?: string;
  label?: string;
  error?: boolean | string;
};

const FormInput = <T extends "card" | "email" | "text">({
  type,
  onChange,
  value,
  label,
  error,
}: FormInputProps<T>) => {
  const [cardError, setCardError] = React.useState("");
  const classes = useStyles({ error: error || cardError })();

  const getInnerComponent = () => {
    if (type === "card") {
      return (
        <CardElement
          onChange={(e) => {
            (onChange as OnChange<"card">)?.(e);
            // Listen for changes in the CardElement
            // and display any errors as the customer types their card details
            // setDisabled(event.empty);
            // setError(event.error ? event.error.message : "");
            // setCardError(e.error ? e.error.message : "");
          }}
          className={classes.input}
          options={{
            style: {
              base: {
                fontSize: "14.4px",
                lineHeight: "28px",
              },
            },
          }}
        />
      );
    }

    return (
      <input
        onChange={({ target: { value: v } }) =>
          (onChange as (value: string) => void)?.(v)
        }
        value={value}
        className={classes.input}
      />
    );
  };

  return (
    <label className={classes.label}>
      {label}
      <div className={classes.errorText}>{error || cardError}</div>
      {getInnerComponent()}
    </label>
  );
};

type UseStylesProps = {
  error?: boolean | string;
};

const useStyles = ({ error }: UseStylesProps) =>
  makeStyles((theme) => ({
    label: {
      width: "100%",
      fontFamily: theme.typography.fontFamily,
      fontSize: "0.9rem",
      display: "grid",
    },
    errorText: {
      color: theme.palette.error.main,
      fontSize: "0.8rem",
      height: error && typeof error === "string" ? 14 : 0,
      marginTop: error && typeof error === "string" ? 2 : 0,
      overflow: "hidden",
      transition: "all 0.3s",
    },
    input: {
      border: `1px solid ${
        error ? theme.palette.error.main : theme.palette.grey[400]
      }`,
      borderRadius: 4,
      alignContent: "baseline",
      height: 30,
      padding: "0 5px",
      marginBottom: 15,
      outline: "none",
      width: "100%",
    },
  }));

export default FormInput;
