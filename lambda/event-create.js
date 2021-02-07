const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const moment = require("moment");

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");

    // const body = {
    //   title: "This is my webinar 2",
    //   subtitle: "We will discuss life in general.",
    //   tickets: [
    //     {
    //       description: "Early Bird",
    //       price: 15,
    //     },
    //     {
    //       description: "General Admission",
    //       price: 20,
    //     },
    //   ],
    //   date: moment().add(1, "day"),
    //   duration: 60,
    // };

    const { title, subtitle, tickets, duration } = body;

    const startDate = moment(body.date).startOf("minute");

    const { meetingId } = await Zoom.createMeeting({
      title,
      startDate,
      duration,
    });

    const { productId, ticketsWithId } = await Stripe.createProduct({
      name: title,
      description: subtitle,
      tickets,
      meetingId,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...body,
        productId,
        meetingId,
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
