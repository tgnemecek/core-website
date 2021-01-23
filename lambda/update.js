const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const Email = require("./services/Email");
const Core = require("./services/Core");

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");

    await Email.send("Here's a text for you");

    // const product = await Stripe.getProduct(body.productId);
    // const prices = await Stripe.getPrices(body.productId);
    // const meeting = await Zoom.getWebinar(product.meetingId);

    // const hasDateChanged = Core.compareDates(body, meeting);
    // const hasPriceChanged = Core.comparePrices(body, prices);

    // await Mailchimp.callPing();

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
