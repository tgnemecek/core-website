const Core = require("./services/Core");
const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const moment = require("moment");

module.exports.handler = async (event, context) => {
  const body = JSON.parse(event.body || "{}");

  const { meetingId, productId, title, subtitle, tickets, duration } = body;
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
    const meeting = await Zoom.getMeeting(meetingId);
    const dateChanged = Core.compareDates(startDate, meeting.start_time)
    const durationChanged = duration !== meeting.duration;

    await Zoom.updateMeeting({
      title,
      startDate,
      duration,
    });

    const updatedTickets = await Stripe.updateProduct({
      productId,
      meetingId,
      name: title,
      description: subtitle,
      tickets,
    });

    if (dateChanged || durationChanged) {
      const registrants = await Zoom.listRegistrants(meetingId);

      await Promise.all(
        registrants.map((registrant) => {
          await Email.send({
            template: "meeting-update",
            to: registrant.email,
            tags: {
              firstName: registrant.first_name,
              meetingName: title,
              meetingLink: registrant.join_url,
              startDate,
              endDate: moment(startTime).add(duration, "minutes"),
            },
          });
        })
      )
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...body,
        tickets: updatedTickets,
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
