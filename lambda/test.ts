import { NetlifyLambdaHandler } from "./types";

const test: NetlifyLambdaHandler = async (event, context) => {
  try {
    // const something = JSON.parse(event.body || "{}");

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
