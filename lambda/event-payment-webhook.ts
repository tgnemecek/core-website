import StripeApi from "stripe";
import Email from "./services/Email";
import Zoom from "./services/Zoom";
import Stripe from "./services/Stripe";
import moment from "moment-timezone";
import { NetlifyLambdaHandler } from "./types";

const eventPaymentWebhook: NetlifyLambdaHandler = async (event, context) => {
  try {
    const signature = event.headers["stripe-signature"];
    const stripeEvent = Stripe.constructEvent(event.body!, signature!);

    const payment: StripeApi.PaymentIntent = stripeEvent.data.object as any;

    if (payment.status !== "succeeded") {
      throw new Error("Payment has not succeeded");
    }

    // Get buyer information
    const { email } = payment.charges.data[0].billing_details;
    const { firstName, lastName, timezone } = payment.charges.data[0].metadata;

    // Get meeting information
    const { meetingId } = payment.metadata;
    const { joinUrl, topic, startTime } = await Zoom.addRegistrant({
      meetingId: Number(meetingId),
      email: email!,
      firstName,
      lastName,
      timezone,
    });

    const startDate = moment(startTime).tz(timezone);

    await Email.send({
      template: "meeting-purchase",
      to: email!,
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

module.exports.handler = eventPaymentWebhook;
