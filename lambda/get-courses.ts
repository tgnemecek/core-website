import { Thinkific } from "./services";
import { NetlifyLambdaHandler } from "./types";

export const getCourses: NetlifyLambdaHandler = async (event, context) => {
  const courses = await Thinkific.getCourses();

  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        courses,
      }),
    };
  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};

module.exports.handler = getCourses;
