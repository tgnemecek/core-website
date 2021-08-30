import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import { theme, Heading } from "components";
import { PayPalButtonName, ServiceName } from "types";
import buttons from "./buttons";

type PayPalButtonsProps = {
  service: ServiceName;
};

const PayPalButtons: React.FC<PayPalButtonsProps> = ({ service }) => {
  const classes = useStyles();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const getButtonNames = (): PayPalButtonName[] => {
    switch (service) {
      case "leading":
        return ["leaderStrengths", "entrepreneurStrengths"];
      case "coaching":
        return ["careerStrengths", "personalStrengths"];
      case "learning":
        return ["personalStrengths", "donation"];
      case "business":
        return ["leaderStrengths", "entrepreneurStrengths"];
      default:
        throw new Error(
          `Service name unrecognized in getPayPalButtons(): ${service}`
        );
    }
  };

  return (
    <>
      <Container>
        <Heading
          subheading="For invaluable in-depth knowledge"
          textAlign="center"
        >
          Premium Reports
        </Heading>
      </Container>
      <Container maxWidth="md">
        <Grid container alignItems="center" spacing={sm ? 2 : 8}>
          {getButtonNames().map((key) => {
            const { label, description, value, price, button } = buttons[key];

            return (
              <Grid item key={key} xs={12} sm={6}>
                <Card raised className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h3">{label}</Typography>
                    <Typography variant="body1">{description}</Typography>
                  </CardContent>
                  <form
                    action="https://www.paypal.com/cgi-bin/webscr"
                    method="post"
                    target="_blank"
                  >
                    <CardActionArea
                      type="submit"
                      className={classes.cardActionArea}
                    >
                      <input name="cmd" type="hidden" value="_s-xclick" />
                      <input
                        name="hosted_button_id"
                        type="hidden"
                        value={value}
                      />
                      <input
                        alt="PayPal - The safer, easier way to pay online!"
                        name="submit"
                        src={button}
                        type="image"
                      />
                      {price && (
                        <Typography
                          variant="subtitle1"
                          className={classes.price}
                        >
                          ${price}
                        </Typography>
                      )}
                    </CardActionArea>
                  </form>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default PayPalButtons;

const useStyles = makeStyles((theme) => ({
  card: {},
  cardContent: {
    height: "250px",
    color: "white",
  },
  cardActionArea: {
    padding: theme.spacing(2),
    textAlign: "center",
    position: "relative",
  },
  price: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: "15px",
  },
}));
