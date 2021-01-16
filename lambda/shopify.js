const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const Shopify = require("shopify-api-node");

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const {
      SHOPIFY_SHOP_NAME,
      SHOPIFY_API_KEY,
      SHOPIFY_API_PASSWORD,
    } = process.env;

    const shopify = new Shopify({
      shopName: SHOPIFY_SHOP_NAME,
      apiKey: SHOPIFY_API_KEY,
      password: SHOPIFY_API_PASSWORD,
    });
    // const res = await shopify.metafield.create({
    //   namespace: "inventory",
    //   key: "meetingUrl",
    //   value: "http://www.google.com",
    //   value_type: "string",
    //   owner_resource: "product",
    //   owner_id: 6173772415176,
    //   description: "Something here",
    // });

    // const res = await shopify.metafield.list();

    const res = await shopify.metafield.get(17066174382280);

    console.dir({ res }, { depth: null });

    console.info("Finished Running.");
    return {
      statusCode: 200,
      body: JSON.stringify({
        ...body,
        // meetingID,
        // calendarID,
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
