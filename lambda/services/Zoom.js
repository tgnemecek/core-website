const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const moment = require("moment");
// Zoom Documentation can be found here:
// https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate

const generateToken = () => {
  return jwt.sign(
    {
      iss: process.env.ZOOM_API_KEY,
      exp: 1496091964000,
    },
    process.env.ZOOM_API_SECRET
  );
};

module.exports = {
  getWebinar: async () => {
    const res = await fetch(
      `https://api.zoom.us/v2/users/${process.env.ZOOM_USER_ID}/meetings`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${generateToken()}`,
          "User-Agent": "Zoom-api-Jwt-Request",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          topic: "Topic here",
          type: 2,
          // start_time: moment(startDate).utcOffset(0).format() "2021-09-28T23:00:00.000Z",
          duration: 15,
          timezone: "America/New_York",
          password: "1234",
          agenda: "agenda here",
        }),
      }
    );
    if (res.status === 201) {
      const { join_url: url, id: meetingId } = await res.json();
      return { url, meetingId };
    } else {
      throw new Error(`Error while creating Zoom meeting.`, res);
    }
  },
  createWebinar: async ({ title, startDate, duration }) => {
    const res = await fetch(
      `https://api.zoom.us/v2/users/${process.env.ZOOM_USER_ID}/meetings`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${generateToken()}`,
          "User-Agent": "Zoom-api-Jwt-Request",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          topic: title,
          type: 2,
          start_time:
            startDate.utcOffset(0).format("YYYY-MM-DDTHH:mm:ss") + "Z",
          duration,
          timezone: "America/New_York",
        }),
      }
    );
    if (res.status === 201) {
      const { join_url: url, id: meetingId } = await res.json();
      return { url, meetingId };
    } else {
      throw new Error(`Error while creating Zoom meeting.`, res);
    }
  },
};
