const moment = require("moment");
const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const Email = require("./services/Email");
const Core = require("./services/Core");

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");

    // const webinarName = "101 Stress Techniques for Businesses";
    // const webinarLink = "http://www.google.com";

    // const endDate = startDate.clone().add(1, "hour");

    // console.log({ body });

    const { productId, tickets } = body;

    const startDate = moment(body.date).startOf("minute");

    // const product = await Stripe.getProduct(productId);
    const prices = await Stripe.getPrices(productId);
    // const meeting = await Zoom.getWebinar(product.meetingId);

    // const hasDateChanged = Core.compareDates(startDate, meeting);
    const hasPriceChanged = Core.comparePrices(tickets, prices);

    console.dir(
      {
        // prices,
        hasPriceChanged,
        // productId,
        // tickets,
      },
      { depth: null }
    );

    let ticketsWithId = tickets;

    if (hasPriceChanged) {
      ticketsWithId = await Stripe.updatePrices(tickets, prices, productId);
    }

    // Cancel
    // await Email.send({
    //   template: "webinar-cancel",
    //   to: ["tgnemecek@gmail.com"],
    //   tags: {
    //     firstName: "Thiago",
    //     webinarName,
    //   },
    // });

    // Reschedule
    // await Email.send({
    //   template: "webinar-reschedule",
    //   to: ["tgnemecek@gmail.com"],
    //   tags: {
    //     firstName: "Thiago",
    //     webinarName,
    //     webinarLink,
    //     startDate,
    //     endDate,
    //   },
    // });

    // Purchase:
    // await Email.send({
    //   template: "webinar-purchase",
    //   to: ["tgnemecek@gmail.com"],
    //   tags: {
    //     firstName: "Thiago",
    //     webinarName,
    //     webinarLink,
    //     formattedDate: `${startDate.format("h:mm A")} on ${endDate.format(
    //       "MM/DD/YYYY"
    //     )}`,
    //     googleCalendarLink: Core.generateCalendarLink({
    //       title: webinarName,
    //       description: `Here is the event link: ${webinarLink}`,
    //       startDate,
    //       endDate,
    //     }),
    //   },
    // });

    // const product = await Stripe.getProduct(body.productId);
    // const prices = await Stripe.getPrices(body.productId);
    // const meeting = await Zoom.getWebinar(product.meetingId);

    // const hasDateChanged = Core.compareDates(body, meeting);
    // const hasPriceChanged = Core.comparePrices(body, prices);

    // await Mailchimp.callPing();

    // if (hasDateChanged) {

    // }

    console.info("Finished Running.");
    return {
      statusCode: 200,
      body: JSON.stringify({
        ...body,
        tickets: ticketsWithId,
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
