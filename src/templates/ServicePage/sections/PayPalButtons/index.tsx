import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import { theme, Heading } from "components";
import { ServiceName } from "types";
import { usePayPalButtons } from "utils";

type PayPalButtonsProps = {
  service: ServiceName;
};

const PayPalButtons: React.FC<PayPalButtonsProps> = ({ service }) => {
  const classes = useStyles();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const buttons = usePayPalButtons(service);

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
        <div className={classes.grid}>
          {buttons.map(({ label, description, value, price, button }) => {
            return (
              <Card raised className={classes.card}>
                <CardContent>
                  <Typography variant="h3">{label}</Typography>
                  <Typography variant="body1">{description}</Typography>
                </CardContent>
                <form
                  action="https://www.paypal.com/cgi-bin/webscr"
                  method="post"
                  target="_blank"
                >
                  {button && value && (
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
                  )}
                </form>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default PayPalButtons;

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gridTemplateRows: "auto",
    gap: 50,
  },
  card: {
    display: "grid",
    gridTemplateRows: "1fr 90px",
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
