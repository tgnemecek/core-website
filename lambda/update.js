const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const Mailchimp = require("./services/Mailchimp");
const Core = require("./services/Core");

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");

    // const product = await Stripe.getProduct(body.productId);
    // const prices = await Stripe.getPrices(body.productId);
    // const meeting = await Zoom.getWebinar(product.meetingId);

    // const hasDateChanged = Core.compareDates(body, meeting);
    // const hasPriceChanged = Core.comparePrices(body, prices);

    await Mailchimp.callPing();

    // if (hasDateChanged) {

    // }

    console.info("Finished Running.");
    return {
      statusCode: 200,
      body: JSON.stringify({
        ...body,
        // productId,
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
