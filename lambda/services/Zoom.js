const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const moment = require("moment");
const Core = require("./Core");
// Zoom Documentation can be found here:
// https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate

const { ZOOM_API_KEY, ZOOM_API_SECRET, ZOOM_USER_ID } = process.env;

const apiPrefix = `https://api.zoom.us/v2/users/${ZOOM_USER_ID}`;

const generateToken = () => {
  return jwt.sign(
    {
      iss: ZOOM_API_KEY,
      exp: 1496091964000,
    },
    ZOOM_API_SECRET
  );
};

const headers = {
  Authorization: `Bearer ${generateToken()}`,
  "User-Agent": "Zoom-api-Jwt-Request",
  "content-type": "application/json",
};

module.exports = {
  getMeeting: async (meetingId) => {
    const res = await fetch(`${apiPrefix}/meetings/${meetingId}`, {
      method: "GET",
      headers,
    });
    if (res.status === 200) {
      return await res.json();
    } else {
      throw new Error(`Error while fetching Zoom meeting.`, res);
    }
  },
  createMeeting: async ({ title, startDate, duration }) => {
    // Docs: https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate
    const res = await fetch(`${apiPrefix}/meetings`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        topic: title,
        type: 2, // 2 = scheduled
        start_time: startDate.utcOffset(0).format("YYYY-MM-DDTHH:mm:ss") + "Z",
        duration,
        timezone: "America/New_York",
        settings: {
          host_video: true,
          participant_video: true,
          mute_upon_entry: true,
          approval_type: 0, // 1 = automatic approval
          close_registration: true,
          show_share_button: false,
        },
      }),
    });
    if (res.status === 201) {
      const { join_url: url, id: meetingId } = await res.json();
      return { url, meetingId };
    } else {
      throw new Error(`Error while creating Zoom meeting.`, res);
    }
  },
  addRegistrant: async (args) => {
    // Docs: https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingregistrantcreate
    const { meetingId, email, firstName, lastName } = args;

    const errors = Object.keys(args).filter((key) => {
      return !args[key].trim();
    });

    if (errors.length) {
      throw new Error(
        `Invalid arguments provided to Zoom.addRegistrant(): ${errors.join(
          ", "
        )}`
      );
    }

    if (!Core.verifyEmail(email)) {
      throw new Error(`Invalid email address: ${email}`);
    }

    const res = await fetch(`${apiPrefix}/meetings/${meetingId}/registrants`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
      }),
    });
    if (res.status === 201) {
      const { join_url: joinUrl } = await res.json();
      return { joinUrl };
    } else {
      throw new Error(`Error while adding Zoom registrant.`, res);
    }
  },
};
