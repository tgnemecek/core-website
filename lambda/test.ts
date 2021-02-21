// import StripeApi from "stripe";
// import Email from "./services/Email";
import Zoom from "./services/Zoom";
// import Stripe from "./services/Stripe";
// import moment from "moment";
import { NetlifyLambdaHandler } from "./types";

// This webhook is called when a single user is refunded and also
// when a event-delete method is called, as it triggers multiple refunds
const test: NetlifyLambdaHandler = async (event, context) => {
  try {
    const result = await Zoom.addRegistrant({
      meetingId: 85765050686,
      email: "tgnemecek+test@gmail.com",
      firstName: "Thiago",
      lastName: "Nemecek",
      timezone: "America/Toronto",
    });

    console.dir(
      {
        result,
      },
      { depth: null }
    );

    // const meetingId = 88075727483;

    // const meeting = await Zoom.getMeeting(meetingId);
    // const registrants = await Zoom.listRegistrants(89255887425);

    // console.dir({ registrants }, { depth: null });

    // const foundRegistrant = registrants.find(
    //   (registrant) => registrant.email === email
    // );

    // This check is needed in case the webhook is being triggered by a event-delete action
    // In this case the registrant has already been removed from the meeting as the
    // Zoom.listRegistrants method only lists approved users.
    // if (foundRegistrant) {
    //   await Promise.all([
    //     Zoom.removeRegistrants({
    //       meetingId: Number(meetingId),
    //       registrants: [foundRegistrant],
    //     }),
    //     await Email.send({
    //       template: "meeting-refund",
    //       to: email!,
    //       tags: {
    //         firstName,
    //         meetingName: description!,
    //       },
    //     }),
    //   ]);
    // }

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

module.exports.handler = test;
