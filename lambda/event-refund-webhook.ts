import StripeApi from "stripe";
import Email from "./services/Email";
import Zoom from "./services/Zoom";
import Stripe from "./services/Stripe";
import { NetlifyLambdaHandler, ZoomMeetingType } from "./types";

// This webhook is called when a single user is refunded and also
// when a event-delete method is called, as it triggers multiple refunds
const eventPaymentWebhook: NetlifyLambdaHandler = async (event, context) => {
  try {
    const signature = event.headers["stripe-signature"];
    const stripeEvent = Stripe.constructEvent(
      event.body!,
      signature!,
      "charge"
    );

    const charge: StripeApi.Charge = stripeEvent.data.object as any;

    if (!charge.refunded) {
      return {
        statusCode: 200,
        body: "",
      };
    }

    const { meetingId } = charge.metadata;

    // Get buyer information
    const { name, email } = charge.billing_details;
    const [firstName] = name!.split("_");

    let isMeetingDeleted = false;
    let meeting: ZoomMeetingType;

    try {
      meeting = await Zoom.getMeeting(Number(meetingId));
    } catch (err) {
      isMeetingDeleted = true;
    }

    const registrants = await Zoom.listRegistrants(Number(meetingId));

    const foundRegistrant = registrants.find(
      (registrant) => registrant.email === email
    );

    // This check is needed in case the webhook is being triggered by a event-delete action
    // In this case the registrant has already been removed from the meeting as the
    // Zoom.listRegistrants method only lists approved users.
    if (foundRegistrant && !isMeetingDeleted) {
      await Promise.all([
        !isMeetingDeleted
          ? Zoom.removeRegistrants({
              meetingId: Number(meetingId),
              registrants: [foundRegistrant],
            })
          : null,
        await Email.send({
          template: "meeting-refund",
          to: email!,
          tags: {
            firstName,
            meetingName: meeting!.topic,
          },
        }),
      ]);
    }

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

module.exports.handler = eventPaymentWebhook;
