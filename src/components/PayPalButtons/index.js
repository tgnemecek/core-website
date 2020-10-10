import React from "react";
import PropTypes from "prop-types";
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
import { theme } from "components/theme";
import paypalBuyNow from "src/img/paypal-buy-now.jpg";
import paypalDonate from "src/img/paypal-donate.jpg";

const buttons = {
  careerStrengths: {
    label: "Career Strengths Scale",
    description:
      "If you're thinking about changing your career, take this Individualized Career Strengths Report to discover your strengths and weaknesses in 6 key success factors--and get practical suggestions for how to quickly improve each one.",
    value: "RLJD2JRPKQ2H2",
    price: 24,
  },
  leaderStrengths: {
    label: "Leader Strengths Scale",
    description:
      "To improve your leadership skills in these challenging times, take the Leadership Strengths Scale to discover your personal AND professional strengths and weaknesses among 6 key success factors. You'll also receive practical tips for rapid improvement.",
    value: "AXSRW3XF4FKR8",
    price: 49,
  },
  entrepreneuerStrengths: {
    label: "Entrepreneuer Strengths Scale",
    description:
      "If you want to start and lead your own business, the Entrepreneur Strengths Scale will reveal your strengths and weaknesses in 6 key factors--plus provide valuable tips to increase your odds of a successful launch.",
    value: "Z86XSVPCFP6H6",
    price: 24,
  },
  personalStrengths: {
    label: "Personal Strengths Scale",
    description:
      "If you’re in a stressful life transition, take this Individualized Personal Strengths Scale to discover your strengths and weaknesses in 6 key life-success factors. You'll also get practical suggestions for how to improve each one.",
    value: "D2ZV5ASMDUXQG",
    price: 24,
  },
  donation: {
    label: "Make a Difference!",
    description:
      "Contribute to the efforts of Core Learning, a 501 c3 non-profit educational services organization, to bring The Balancing Act's transformational life/work skills training to at-risk youth and adults around the globe.",
    value: "JTFYEZ4SXFFW6",
    button: paypalDonate,
  },
};

const PayPalButtons = ({ buttonTypes }) => {
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
                        src={button || paypalBuyNow}
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

PayPalButtons.prototypes = {
  buttonTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
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
