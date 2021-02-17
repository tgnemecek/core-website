import Zoom from "./services/Zoom";
import Stripe from "./services/Stripe";
import moment from "moment";
import { NetlifyLambdaHandler, EventCreateBody } from "./types";

const eventCreate: NetlifyLambdaHandler = async (event, context) => {
  if (!context.clientContext.user) {
    // Restricted route
    return {
      statusCode: 403,
      body: "Unauthorized",
    };
  }
  const body: EventCreateBody = JSON.parse(event.body || "{}");

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

module.exports.handler = eventCreate;
