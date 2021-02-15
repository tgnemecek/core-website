import Core from "./services/Core";
import Email from "./services/Email";
import Zoom from "./services/Zoom";
import Stripe from "./services/Stripe";
import moment from "moment";
import { NetlifyLambdaHandler } from "./types";

const eventUpdate: NetlifyLambdaHandler = async (event, context) => {
  if (!context.clientContext.user) {
    // Restricted route
    return {
      statusCode: 403,
      body: "Unauthorized",
    };
  }

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
    const dateChanged = Core.compareDates(
      startDate,
      moment(meeting.start_time)
    );
    const durationChanged = duration !== meeting.duration;

    await Zoom.updateMeeting({
      meetingId,
      title,
      startDate,
      duration,
    });

    const updatedTickets = await Stripe.updateProduct({
      productId,
      meetingId,
      title,
      subtitle,
      tickets,
    });

    if (dateChanged || durationChanged) {
      const registrants = await Zoom.listRegistrants(meetingId);
      await Promise.all(
        registrants.map((registrant) => {
          return Email.send({
            template: "meeting-update",
            to: registrant.email,
            tags: {
              firstName: registrant.first_name,
              meetingName: title,
              meetingLink: registrant.join_url,
              startDate,
              endDate: startDate.add(duration, "minutes"),
            },
          });
        })
      );
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

module.exports.handler = eventUpdate;
