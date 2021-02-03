const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const Core = require("./services/Core");
const moment = require("moment");
const { AssignmentReturnedOutlined } = require("@material-ui/icons");

// const body = {
//   ticketId: "string",
//   redirectUrl: "string",
// };

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const price = await Stripe.getPrice(body.ticketId);

    const session = await Stripe.createCheckout(price, body.redirectUrl);

    return {
      statusCode: 200,
      body: JSON.stringify(session),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};
