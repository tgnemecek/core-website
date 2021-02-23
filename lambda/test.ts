// import StripeApi from "stripe";
// import Email from "./services/Email";
import Core from "./services/Core";

// import jwt from "jsonwebtoken";
// import Zoom from "./services/Zoom";
// import Stripe from "./services/Stripe";
// import crypto from "crypto";
// import jose from "node-jose";
import { NetlifyLambdaHandler } from "./types";

// This webhook is called when a single user is refunded and also
// when a event-delete method is called, as it triggers multiple refunds
const test: NetlifyLambdaHandler = async (event, context) => {
  try {
    // const code = Core.encryptEventIds("prodIdHere", 1920428);

    // console.log({ code });

    // const decoded = Core.decryptEventIds(
    //   "brEWUEQbyqPSg9jpMEl/NLCOX8y1v+qlBJGf+WOdT3nqL/IYFLVOcegdNxg/vF9m"
    // );

    // console.log({
    //   decoded,
    // });

    // // const keystore = jose.JWK.createKeyStore();

    // const obj = {
    //   someId: "123",
    //   someId2: "1234",
    // };

    // // const a = jose.JWS.createSign('W0oAcl8lKYyiWBZl5zAhkbIMQEItdnXumEzXWBlwbu0')

    // const key = await jose.JWK.createKey("oct", 256, {
    //   kid: "W0oAcl8lKYyiWBZl5zAhkbIMQEItdnXumEzXWBlwbu0",
    //   // alg: "A256GCM",
    // });

    // const a = await jose.JWE.createEncrypt({ zip: true }, key)
    //   .update(JSON.stringify(obj))
    //   .final();

    // console.dir({ a }, { depth: null });

    // const sig = await jose.JWS.createSign(key)
    //   .update(JSON.stringify(obj), "utf8")
    //   .final();

    // const ver = await jose.JWS.createVerify(key).verify(
    //   JSON.stringify({
    //     yo: "123",
    //   })
    // )

    // console.log({ ver });
    // const token = jwt.sign(
    //   {
    //     meetingId: "12345",
    //     productId: "addRegistrantaddRegistrantaddRegistrant",
    //   },
    //   "keyhere123"
    // );

    // console.log({ token });

    // const verification = jwt.verify(token, "keyhere123");

    // console.log({ verification });

    // const result = await Zoom.addRegistrant({
    //   meetingId: 85765050686,
    //   email: "tgnemecek+test@gmail.com",
    //   firstName: "Thiago",
    //   lastName: "Nemecek",
    //   timezone: "America/Toronto",
    // });

    // console.dir(
    //   {
    //     result,
    //   },
    //   { depth: null }
    // );

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
