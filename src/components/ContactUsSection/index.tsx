import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "@reach/router";
import {
  Paper,
  Typography,
  TextField,
  IconButton,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import SendIcon from "@material-ui/icons/Send";
import { Section, Heading, theme } from "components";
import useContactUs from "./useContactUs";

const initialForm = (pathname: string): Record<string, string> => ({
  name: "",
  email: "",
  message: "",
  page: pathname,
});

type Status = "idle" | "loading" | "success" | "error";

const ContactUsSection: React.FC = () => {
  const { heading } = useContactUs();
  const [status, setStatus] = React.useState<Status>("idle");
  const [submitted, setSubmitted] = React.useState(false);

  const { pathname } = useLocation();
  const [form, setForm] = React.useState(initialForm(pathname));

  const classes = useStyles({
    showThanks: status === "success",
    loading: status === "loading",
  })();

  const handleChange = (key: keyof typeof form) => {
    return (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new URLSearchParams({
      "form-name": "contact",
      ...form,
    }).toString();

    setStatus("loading");

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      setSubmitted(true);
      setStatus("success");
      setForm(initialForm(pathname));
    } catch (err) {
      setSubmitted(true);
      setStatus("error");
      if (process.env.NODE_ENV === "development") {
        throw err;
      }
    }
  };

  const { name, email, message } = form;

  return (
    <Section id="contact-form" backgroundColor={theme.palette.grey[50]}>
      <Heading textAlign="center">{heading}</Heading>
      <div className={classes.container}>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          <Paper className={classes.paper} elevation={6}>
            <TextField
              name="name"
              label="Your Name"
              variant="filled"
              value={name}
              onChange={handleChange("name")}
              fullWidth
              required
            />
            <TextField
              name="email"
              type="email"
              label="Your Email"
              variant="filled"
              value={email}
              onChange={handleChange("email")}
              fullWidth
              required
            />
            <TextField
              name="message"
              label="Your Message"
              variant="filled"
              value={message}
              onChange={handleChange("message")}
              fullWidth
              multiline
              rows={5}
              required
            />
            <input type="hidden" name="page" />
            <div className={classes.loading}>
              <CircularProgress />
            </div>
            <div className={classes.thankYou}>
              <div>
                <div>
                  <Typography variant="body2" align="center">
                    Thank you!
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" align="center">
                    We'll get in contact shortly!
                  </Typography>
                </div>
              </div>
            </div>
            <div className={classes.buttonWrapper}>
              <IconButton
                className={classes.button}
                type="submit"
                disabled={status !== "idle"}
              >
                <SendIcon />
              </IconButton>
            </div>
          </Paper>
        </form>
      </div>
      <Snackbar
        open={submitted}
        autoHideDuration={3000}
        onClose={(...[, reason]) => {
          if (reason === "timeout") {
            setSubmitted(false);
          }
        }}
      >
        <Alert
          severity={status === "success" ? status : "error"}
          className={classes.alert}
        >
          {status === "success"
            ? "Message sent successfully!"
            : `The form could not be sent, please check your connection and try
              again.`}
        </Alert>
      </Snackbar>
    </Section>
  );
};

export default ContactUsSection;

type UseStylesProps = {
  showThanks: boolean;
  loading: boolean;
};

const useStyles = ({ showThanks, loading }: UseStylesProps) =>
  makeStyles((theme) => ({
    container: {
      maxWidth: 600,
      width: "100%",
      padding: `0 40px`,
      margin: "auto",
    },
    heading: {
      textAlign: "center",
      border: "none",
      marginBottom: 40,
    },
    paper: {
      backgroundColor: "#fffcec",
      padding: theme.spacing(3),
      display: "grid",
      gap: "15px",
      position: "relative",
    },
    loading: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#1d1d1dc9",
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: Number(loading),
      pointerEvents: loading ? "initial" : "none",
      transition: "opacity 1s",
      borderRadius: theme.shape.borderRadius,
    },
    thankYou: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#1d1d1dc9",
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: Number(showThanks),
      pointerEvents: showThanks ? "initial" : "none",
      transition: "opacity 1s",
      borderRadius: theme.shape.borderRadius,
      "& .MuiTypography-root": {
        color: "white",
      },
    },
    buttonWrapper: {
      position: "absolute",
      left: "calc(100% - 23px)",
      top: "calc(100% - 23px)",
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      boxShadow: theme.shadows[10],
      opacity: Number(!showThanks),
      zIndex: 2,
      transition: "all 0.2s",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    alert: {
      fontSize: "1rem",
    },
  }));
