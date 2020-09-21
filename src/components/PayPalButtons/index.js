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

import Section from "components/Section";

const buttons = {
  careerStrengths: {
    label: "Career Strengths Scale",
    description:
      "This scale will measure all the things related to some thing. This scale will measure all the things related to some thing.",
    value: "RLJD2JRPKQ2H2",
    price: 1,
  },
  leadershipStrengths: {
    label: "Leadership Strengths Scale",
    description:
      "This scale will measure all the things related to some thing. This scale will measure all the things related to some thing.",
    value: "AXSRW3XF4FKR8",
    price: 1,
  },
  entrepreneuerStrengths: {
    label: "Entrepreneuer Strengths Scale",
    description:
      "This scale will measure all the things related to some thing. This scale will measure all the things related to some thing.",
    value: "Z86XSVPCFP6H6",
    price: 1,
  },
  careerBalance: {
    label: "Career Balance Profile",
    description:
      "This scale will measure all the things related to some thing. This scale will measure all the things related to some thing.",
    value: "G4FNAL4UMBYXA",
    price: 1,
  },
  leadershipBalance: {
    label: "Leadership Balance Profile",
    description:
      "This scale will measure all the things related to some thing. This scale will measure all the things related to some thing.",
    value: "A3M5P48V2LLBC",
    price: 1,
  },
  personalStrengths: {
    label: "Personal Strengths Scale",
    description:
      "This scale will measure all the things related to some thing. This scale will measure all the things related to some thing.",
    value: "D2ZV5ASMDUXQG",
    price: 1,
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
            const { label, description, value, price } = buttons[key];

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
                    target="_top"
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
                        src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
                        type="image"
                      />
                      <Typography variant="subtitle1" className={classes.price}>
                        ${price}
                      </Typography>
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
