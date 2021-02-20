import Core from "./services/Core";
import StripeApi from "stripe";
import Email from "./services/Email";
import Zoom from "./services/Zoom";
import Stripe from "./services/Stripe";
import moment from "moment-timezone";
import {
  NetlifyLambdaHandler,
  EventUpdateBody,
  ZoomMeetingType,
  TicketType,
} from "./types";

const eventUpdate: NetlifyLambdaHandler = async (event, context) => {
  if (!context.clientContext.user) {
    // Restricted route
    return {
      statusCode: 403,
      body: "Unauthorized",
    };
  }

  const body: EventUpdateBody = JSON.parse(event.body || "{}");

  const { meetingId, productId, title, tickets, duration } = body;
  const startDate = moment(body.date).startOf("minute");

  let meeting: ZoomMeetingType;
  let product: StripeApi.Product;
  let prices: StripeApi.Price[];

  try {
    [meeting, product, prices] = await Promise.all([
      Zoom.getMeeting(meetingId),
      Stripe.getProduct(productId),
      Stripe.listProductPrices(productId),
    ]);
  } catch (err) {
    return {
      statusCode: 503,
      body: "External Service Providers are down. Please try again later.",
    };
  }

  try {
    const titleChanged = title !== meeting.topic || title !== product.name;
    const dateChanged = !startDate.isSame(moment(meeting.start_time), "minute");
    const durationChanged = duration !== meeting.duration;

    const haveTicketsChanged = Core.compareTickets(tickets, prices);

    const promises: Promise<any>[] = [];

    if (titleChanged || haveTicketsChanged) {
      promises.push(
        Stripe.updateProduct({
          productId,
          meetingId,
          title,
          tickets,
        })
      );
    } else {
      promises.push(Promise.resolve(undefined));
    }

    if (titleChanged || dateChanged || durationChanged) {
      promises.push(
        Zoom.updateMeeting({
          meetingId,
          title,
          startDate,
          duration,
        })
      );
    }

    if (dateChanged || durationChanged) {
      const sendEmails = async () => {
        const registrants = await Zoom.listRegistrants(meetingId);

        return await Promise.all(
          registrants.map((registrant) => {
            console.dir(
              {
                registrant,
              },
              { depth: null }
            );
            const timezone = registrant.address || "America/Toronto";
            const tzStartDate = startDate.clone().tz(timezone);

            console.log({
              timezone,
            });

            return Email.send({
              template: "meeting-update",
              to: registrant.email,
              tags: {
                firstName: registrant.first_name,
                meetingName: title,
                meetingLink: registrant.join_url,
                startDate: tzStartDate,
                endDate: tzStartDate.clone().add(duration, "minutes"),
              },
            });
          })
        );
      };
      promises.push(sendEmails());
    }

    const [updatedTickets] = await Promise.all<TicketType[]>(promises);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...body,
        tickets: updatedTickets || tickets,
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
