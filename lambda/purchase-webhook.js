const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const Core = require("./services/Core");
const moment = require("moment");

module.exports.handler = async (event, context) => {
  try {
    const signature = event.headers["stripe-signature"];
    const checkout = Stripe.constructEvent(event.body, signature);

    const sendEmail = () => {
      console.log("email sent");
    };

    console.log({ checkout });

    switch (checkout.type) {
      case "checkout.session.completed":
        if (checkout.payment_status !== "paid") break;
      case "checkout.session.async_payment_succeeded":
        // sendEmail();
        break;

      case "checkout.session.failed":
        // sendErrorMessage()
        break;
      default:
        throw new Error(
          `Payment Intent type is incorrect, got: ${checkout.type}`
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
