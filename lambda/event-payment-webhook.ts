import StripeApi from "stripe";
import Email from "./services/Email";
import Zoom from "./services/Zoom";
import Stripe from "./services/Stripe";
import moment from "moment";
import { NetlifyLambdaHandler } from "./types";

const eventPaymentWebhook: NetlifyLambdaHandler = async (event, context) => {
  try {
    const signature = event.headers["stripe-signature"];
    const stripeEvent = Stripe.constructEvent(event.body, signature);

    const payment: StripeApi.PaymentIntent = stripeEvent.data.object as any;

    if (payment.status !== "succeeded") {
      throw new Error("Payment has not succeeded");
    }

    // Get buyer information
    const { name, email } = payment.charges.data[0].billing_details;
    const [firstName, lastName] = name.split("_");

    // Get meeting information
    const { meetingId } = payment.metadata;
    const { joinUrl, topic, startTime } = await Zoom.addRegistrant({
      meetingId,
      email,
      firstName,
      lastName,
    });

    await Email.send({
      template: "meeting-purchase",
      to: email,
      tags: {
        firstName,
        meetingName: topic,
        meetingLink: joinUrl,
        startDate: moment(startTime),
        endDate: moment(startTime).add(60, "minutes"),
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
