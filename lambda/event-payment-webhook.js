const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const Email = require("./services/Email");
const moment = require("moment");

module.exports.handler = async (event, context) => {
  try {
    const signature = event.headers["stripe-signature"];
    const stripeEvent = Stripe.constructEvent(event.body, signature);

    const payment = stripeEvent.data.object;

    if (payment.status !== "succeeded") {
      throw new Error("Payment has not succeeded");
    }

    // Get buyer information
    const { name, email } = payment.charges.data[0].billing_details;
    const [firstName, lastName] = name.split("_");

    // Get meeting information
    const { meetingId } = payment.metadata;
    const { joinUrl, topic, startTime } = await Zoom.addRegistrant({
      meetingId,
      email,
      firstName,
      lastName,
    });

    await Email.send({
      template: "meeting-purchase",
      to: email,
      tags: {
        firstName,
        meetingName: topic,
        meetingLink: joinUrl,
        startDate: moment(startTime),
        endDate: moment(startTime).add(60, "minutes"),
      },
    });

    return {
      statusCode: 200,
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};
