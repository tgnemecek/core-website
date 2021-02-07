const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const Email = require("./services/Email");
const moment = require("moment");

module.exports.handler = async (event, context) => {
  try {
    const signature = event.headers["stripe-signature"];
    const stripeEvent = Stripe.constructEvent(event.body, signature);

    const payment = stripeEvent.data.object;

    const sendEmail = () => {
      console.log("email sent");
    };

    // const a = {
    //   payment: {
    //     id: "pi_1IIHMhG9T6XK0FGijUAzseUt",
    //     object: "payment_intent",
    //     amount: 2000,
    //     amount_capturable: 0,
    //     amount_received: 2000,
    //     application: null,
    //     application_fee_amount: null,
    //     canceled_at: null,
    //     cancellation_reason: null,
    //     capture_method: "automatic",
    //     charges: {
    //       object: "list",
    //       data: [
    //         {
    //           id: "ch_1IIHN8G9T6XK0FGi1vEMRRY8",
    //           object: "charge",
    //           amount: 2000,
    //           amount_captured: 2000,
    //           amount_refunded: 0,
    //           application: null,
    //           application_fee: null,
    //           application_fee_amount: null,
    //           balance_transaction: "txn_1IIHN9G9T6XK0FGirEVFIluX",
    //           billing_details: {
    //             address: {
    //               city: null,
    //               country: null,
    //               line1: null,
    //               line2: null,
    //               postal_code: "92382",
    //               state: null,
    //             },
    //             email: "email@email.com",
    //             name: "fname lname",
    //             phone: null,
    //           },
    //           calculated_statement_descriptor: "Stripe",
    //           captured: true,
    //           created: 1612720114,
    //           currency: "usd",
    //           customer: null,
    //           description: null,
    //           destination: null,
    //           dispute: null,
    //           disputed: false,
    //           failure_code: null,
    //           failure_message: null,
    //           fraud_details: {},
    //           invoice: null,
    //           livemode: false,
    //           metadata: {},
    //           on_behalf_of: null,
    //           order: null,
    //           outcome: {
    //             network_status: "approved_by_network",
    //             reason: null,
    //             risk_level: "normal",
    //             risk_score: 29,
    //             seller_message: "Payment complete.",
    //             type: "authorized",
    //           },
    //           paid: true,
    //           payment_intent: "pi_1IIHMhG9T6XK0FGijUAzseUt",
    //           payment_method: "pm_1IIHN8G9T6XK0FGixhX3eHfV",
    //           payment_method_details: {
    //             card: {
    //               brand: "visa",
    //               checks: {
    //                 address_line1_check: null,
    //                 address_postal_code_check: "pass",
    //                 cvc_check: "pass",
    //               },
    //               country: "US",
    //               exp_month: 1,
    //               exp_year: 2029,
    //               fingerprint: "AIvkoQLIykQ6XJf5",
    //               funding: "credit",
    //               installments: null,
    //               last4: "4242",
    //               network: "visa",
    //               three_d_secure: null,
    //               wallet: null,
    //             },
    //             type: "card",
    //           },
    //           receipt_email: null,
    //           receipt_number: null,
    //           receipt_url:
    //             "https://pay.stripe.com/receipts/acct_1I0WzRG9T6XK0FGi/ch_1IIHN8G9T6XK0FGi1vEMRRY8/rcpt_Iu5Y8LgipDQrQsDFlMF0rciqAa5SuWt",
    //           refunded: false,
    //           refunds: {
    //             object: "list",
    //             data: [],
    //             has_more: false,
    //             total_count: 0,
    //             url: "/v1/charges/ch_1IIHN8G9T6XK0FGi1vEMRRY8/refunds",
    //           },
    //           review: null,
    //           shipping: null,
    //           source: null,
    //           source_transfer: null,
    //           statement_descriptor: null,
    //           statement_descriptor_suffix: null,
    //           status: "succeeded",
    //           transfer_data: null,
    //           transfer_group: null,
    //         },
    //       ],
    //       has_more: false,
    //       total_count: 1,
    //       url: "/v1/charges?payment_intent=pi_1IIHMhG9T6XK0FGijUAzseUt",
    //     },
    //     client_secret:
    //       "pi_1IIHMhG9T6XK0FGijUAzseUt_secret_VeKOxUBVHvLlvxlCFfD6DMug0",
    //     confirmation_method: "automatic",
    //     created: 1612720087,
    //     currency: "usd",
    //     customer: null,
    //     description: null,
    //     invoice: null,
    //     last_payment_error: null,
    //     livemode: false,
    //     metadata: {},
    //     next_action: null,
    //     on_behalf_of: null,
    //     payment_method: "pm_1IIHN8G9T6XK0FGixhX3eHfV",
    //     payment_method_options: {
    //       card: {
    //         installments: null,
    //         network: null,
    //         request_three_d_secure: "automatic",
    //       },
    //     },
    //     payment_method_types: ["card"],
    //     receipt_email: null,
    //     review: null,
    //     setup_future_usage: null,
    //     shipping: null,
    //     source: null,
    //     statement_descriptor: null,
    //     statement_descriptor_suffix: null,
    //     status: "succeeded",
    //     transfer_data: null,
    //     transfer_group: null,
    //   },
    // };

    console.dir({ payment }, { depth: null });

    if (payment.status !== "succeeded") {
      throw new Error("Payment has not succeeded");
    }

    const { name, email } = payment.charges.data[0].billing_details;

    const firstName = name.split("_")[0];

    console.log({ firstName, email });

    // await Email.send({
    //   template: "meeting-purchase",
    //   to: email,
    //   tags: {
    //     firstName,
    //     meetingName: "aaa",
    //     meetingLink: "bbb",
    //     startDate: "aaa",
    //     endDate: "aaa",
    //   },
    // });

    // Send email here
    console.log("Operation successful");

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
