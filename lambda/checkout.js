const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const Core = require("./services/Core");
const moment = require("moment");

module.exports.handler = async (event, context) => {
  try {
    // const body = JSON.parse(event.body || "{}");

    const body = {
      ticketId: "MEYG9T6XK0FGiV7ZXA2EI",
    };

    const price = await Stripe.getPrice(body.ticketId);

    await Stripe.createCheckout(price.id);

    return;

    // const { joinUrl } = await Zoom.addRegistrant({
    //   title,
    //   startDate,
    //   duration,
    // });

    console.info("Finished Running.");
    return {
      statusCode: 200,
      body: JSON.stringify({
        ...body,
        productId,
        tickets: ticketsWithId,
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
