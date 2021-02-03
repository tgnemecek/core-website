const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const Core = require("./services/Core");
const moment = require("moment");

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const signature = event.headers["stripe-signature"];

    const stripeEvent = Stripe.constructEvent(event.body, signature);

    console.dir(stripeEvent, { depth: null });

    if (stripeEvent.type !== "payment_intent.succeeded") {
      throw new Error(
        `Payment Intent type is incorrect, got: ${stripeEvent.type}`
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};
