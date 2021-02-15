const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const moment = require("moment");

module.exports.handler = async (event, context) => {
  const body = JSON.parse(event.body || "{}");

  const { title, subtitle, tickets, duration } = body;
  const startDate = moment(body.date).startOf("minute");

  try {
    await Promise.all([Zoom.ping(), Stripe.ping()]);
  } catch (err) {
    return {
      statusCode: 503,
      body: "External Service Providers are down. Please try again later.",
    };
  }

  try {
    const { meetingId } = await Zoom.createMeeting({
      title,
      startDate,
      duration,
    });

    const { productId, ticketsWithId } = await Stripe.createProduct({
      title,
      subtitle,
      tickets,
      meetingId,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        productId,
        meetingId,
        tickets: ticketsWithId,
      }),
    };
  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
