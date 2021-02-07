const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const Email = require("./services/Email");
const moment = require("moment");

module.exports.handler = async (event, context) => {
  try {
    const signature = event.headers["stripe-signature"];
    const stripeEvent = Stripe.constructEvent(event.body, signature);

    const payment = stripeEvent.data.object;

    console.dir({ payment }, { depth: null });

    if (payment.status !== "succeeded") {
      throw new Error("Payment has not succeeded");
    }

    // Get meeting information
    const { meetingId } = payment.metadata;
    const meeting = await Zoom.getMeeting(meetingId);

    // Get buyer information
    const { name, email } = payment.charges.data[0].billing_details;
    const firstName = name.split("_")[0];

    await Email.send({
      template: "meeting-purchase",
      to: email,
      tags: {
        firstName,
        meetingName: meeting.topic,
        meetingLink: meeting.join_url,
        startDate: moment(meeting.start_time),
        endDate: moment(meeting.start_time).add(meeting.duration, "minutes"),
      },
    });
    console.log("Operation successful");
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
