import Core from "./services/Core";
import Email from "./services/Email";
import Zoom from "./services/Zoom";
import Stripe from "./services/Stripe";
import moment from "moment-timezone";
import { NetlifyLambdaHandler, EventRegisterFreeBody } from "./types";

const eventRegisterFree: NetlifyLambdaHandler = async (event) => {
  try {
    const body: EventRegisterFreeBody = JSON.parse(event.body || "{}");

    const { eventId, ticketId, timezone, firstName, lastName, email } = body;

    const missingInputs = (
      [
        "eventId",
        "ticketId",
        "timezone",
        "firstName",
        "lastName",
        "email",
      ] as const
    ).filter((key) => !body[key]);

    if (missingInputs.length) {
      return {
        statusCode: 400,
        body: `Missing inputs: ${missingInputs.join(",")}`,
      };
    }

    const price = await Stripe.getPrice(ticketId);

    if (price.unit_amount) {
      return {
        statusCode: 403,
        body: `The Event is not a Free Event and should be processed via Stripe.`,
      };
    }

    const { meetingId } = Core.decryptEventIds(eventId);

    const { joinUrl, topic, startTime } = await Zoom.addRegistrant({
      meetingId: Number(meetingId),
      email,
      firstName,
      lastName,
      timezone,
    });

    const startDate = moment(startTime).tz(timezone);

    await Email.send({
      template: "meeting-purchase",
      to: email,
      tags: {
        firstName,
        meetingName: topic,
        meetingLink: joinUrl,
        startDate,
        endDate: startDate.clone().add(60, "minutes"),
      },
    });

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

module.exports.handler = eventRegisterFree;
