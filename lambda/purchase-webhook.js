const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const Email = require("./services/Email");
const moment = require("moment");

module.exports.handler = async (event, context) => {
  try {
    const signature = event.headers["stripe-signature"];
    const stripeEvent = Stripe.constructEvent(event.body, signature);

    const checkout = stripeEvent.data.object;

    const sendEmail = () => {
      console.log("email sent");
    };

    const a = {
      checkout: {
        id: "evt_1IHH0JG9T6XK0FGiUQuATvcW",
        object: "event",
        api_version: "2020-08-27",
        created: 1612480371,
        data: {
          object: {
            id:
              "cs_test_a1uK0rlJbe4HxGOLPQCPpvWkOnmx5uvS7iNKWibFMH5PifKntfGxXLalO6",
            object: "checkout.session",
            allow_promotion_codes: null,
            amount_subtotal: 2000,
            amount_total: 2000,
            billing_address_collection: null,
            cancel_url:
              "https://core-website-2020-test.netlify.app/event/2020-12-13-leading-your-life-work-from-the-inside/?cancel=true",
            client_reference_id: null,
            currency: "usd",
            customer: "cus_It3659Dd3mRXvA",
            customer_details: {
              email: "asdasdas@asdasd.com",
              tax_exempt: "none",
              tax_ids: [],
            },
            customer_email: null,
            livemode: false,
            locale: null,
            metadata: { meetingId: "123123123123" },
            mode: "payment",
            payment_intent: "pi_1IHGzvG9T6XK0FGir0NFQIfk",
            payment_method_types: ["card"],
            payment_status: "paid",
            setup_intent: null,
            shipping: null,
            shipping_address_collection: null,
            submit_type: null,
            subscription: null,
            success_url:
              "https://core-website-2020-test.netlify.app/event/2020-12-13-leading-your-life-work-from-the-inside/?success=true",
            total_details: { amount_discount: 0, amount_tax: 0 },
          },
        },
        livemode: false,
        pending_webhooks: 1,
        request: { id: null, idempotency_key: null },
        type: "checkout.session.completed",
      },
    };

    console.dir({ checkout }, { depth: null });

    switch (stripeEvent.type) {
      case "checkout.session.completed":
        if (checkout.payment_status !== "paid") break;
      case "checkout.session.async_payment_succeeded":
        // await Email.send({
        //   template: "meeting-purchase",
        //   to: checkout.customer_details.email,
        //   tags: {
        //     // "firstName",
        //     // "meetingName",
        //     // "meetingLink",
        //     // "startDate",
        //     // "endDate"
        //   },
        // });
        break;

      case "checkout.session.failed":
        // sendErrorMessage()
        break;
      default:
        throw new Error(
          `Payment Intent type is incorrect, got: ${checkout.type}`
        );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};
