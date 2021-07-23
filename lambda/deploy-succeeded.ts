import { NetlifyLambdaHandler } from "./types";

const deploySucceeded: NetlifyLambdaHandler = async (event, context) => {
  console.log("RUNNING deploySucceeded ----------------");
  try {
    const body = JSON.parse(event.body || "{}");

    console.log({
      body,
      context,
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

module.exports.handler = deploySucceeded;
