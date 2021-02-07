const Zoom = require("./services/Zoom");
const Stripe = require("./services/Stripe");
const Core = require("./services/Core");
const moment = require("moment");
const { AssignmentReturnedOutlined } = require("@material-ui/icons");

// const body = {
//   ticketId: "string",
//   redirectUrl: "string",
// };

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");

    await Zoom.addRegistrant({
      meetingId: "87527721758",
      email: "email@email.com",
      firstName: "First Name",
      lastName: "Last Name",
    });

    return {
      statusCode: 200,
      body: JSON.stringify(session),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};
