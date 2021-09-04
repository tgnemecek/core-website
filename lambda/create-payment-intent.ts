import Stripe from "./services/Stripe";
import { NetlifyLambdaHandler, CreatePaymentIntentBody } from "./types";

export const createPaymentIntent: NetlifyLambdaHandler = async (event, c) => {
  try {
    const body: CreatePaymentIntentBody = JSON.parse(event.body || "{}");

    console.log({ body, a: "1" });

    const { ticketId, timezone, title } = body;

    const missingInputs = (["ticketId", "timezone", "title"] as const).filter(
      (key) => !body[key]
    );

    if (missingInputs.length) {
      return {
        statusCode: 400,
        body: `Missing inputs: ${missingInputs.join(",")}`,
      };
    }

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
