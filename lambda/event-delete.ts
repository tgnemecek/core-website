import Email from "./services/Email";
import Zoom from "./services/Zoom";
import Stripe from "./services/Stripe";
import { NetlifyLambdaHandler, EventDeleteBody } from "./types";

const eventDelete: NetlifyLambdaHandler = async (event, context) => {
  if (!context.clientContext.user) {
    // Restricted route
    return {
      statusCode: 403,
      body: "Unauthorized",
    };
  }

  const body: EventDeleteBody = JSON.parse(event.body || "{}");

  const { meetingId, productId } = body;

  try {
    await Promise.all([Zoom.ping(), Stripe.ping()]);
  } catch (err) {
    return {
      statusCode: 503,
      body: "External Service Providers are down. Please try again later.",
    };
  }

  try {
    const [meeting, registrants] = await Promise.all([
      Zoom.getMeeting(meetingId), // Gets meeting data
      Zoom.listRegistrants(meetingId), // Gets meeting registrants
    ]);

    console.log({
      registrants,
    });

    if (registrants.length) {
      await Promise.all([
        ...registrants.map((registrant) => {
          return Email.send({
            template: "meeting-cancel",
            to: registrant.email,
            tags: {
              firstName: registrant.first_name,
              meetingName: meeting.topic,
            },
          });
        }),
      ]);
    }

    await Zoom.deleteMeeting(meetingId); // Deletes meeting in Zoom
    await Stripe.deleteProduct(productId); // Deactivates prices in Stripe, creates refunds

    return {
      statusCode: 200,
      body: "",
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};

module.exports.handler = eventDelete;
