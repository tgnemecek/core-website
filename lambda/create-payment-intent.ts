import Stripe from "./services/Stripe";
import { NetlifyLambdaHandler } from "./types";

const createPaymentIntent: NetlifyLambdaHandler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const price = await Stripe.getPrice(body.ticketId);
    const paymentIntent = await Stripe.createPaymentIntent(price);

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};

module.exports.handler = createPaymentIntent;
