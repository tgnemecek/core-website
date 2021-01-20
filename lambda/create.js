const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const Core = require("./services/Core");

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const { meetingId, url } = await Zoom.createWebinar();
    const { productId, tickets } = await Stripe.createProduct({
      name: "Product Name",
      description: "Product Description",
      tickets: [
        {
          price: 1,
        },
        {
          price: 2,
        },
      ],
      url,
      meetingId,
    });

    // console.log({
    //   ...body,
    //   productId,
    //   tickets,
    // });
    console.info("Finished Running.");
    return {
      statusCode: 200,
      body: JSON.stringify({
        ...body,
        productId,
        tickets,
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
