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
import { theme } from "components";
import { PayPalButtonName } from "types";
import buttons from "./buttons";

type PayPalButtonsProps = {
  buttonTypes: PayPalButtonName[];
};

const PayPalButtons: React.FC<PayPalButtonsProps> = ({ buttonTypes }) => {
  const classes = useStyles();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Container>
        <Typography variant="h2">Premium Reports</Typography>
        <Typography variant="subtitle1">
          For invaluable in-depth knowledge
        </Typography>
      </Container>
      <Container maxWidth="md">
        <Grid container alignItems="center" spacing={sm ? 2 : 8}>
          {buttonTypes.map((key) => {
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
