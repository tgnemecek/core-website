import Stripe from "./services/Stripe";
import { NetlifyLambdaHandler, CreatePaymentIntentBody } from "./types";

const createPaymentIntent: NetlifyLambdaHandler = async (event, context) => {
  try {
    const { ticketId, timezone, title }: CreatePaymentIntentBody = JSON.parse(
      event.body || "{}"
    );

    const price = await Stripe.getPrice(ticketId);
    const paymentIntent = await Stripe.createPaymentIntent({
      price,
      title,
      timezone,
    });

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
