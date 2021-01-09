const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const kloudless = require("kloudless")(process.env.KLOUDLESS_CALENDAR_API_KEY);
const { google } = require("googleapis");
const moment = require("moment");

// Zoom Documentation for this endpoint can be found here:
// https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const verifyIdentity = async () => {
      // TODO: This is incomplete
      const { identity, user } = context.clientContext;
      const userReq = await fetch(
        `https://core-website-2020-test.netlify.app/.netlify/identity/admin/users/{${user.sub}}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${identity.token}`,
          },
        }
      );
      const userData = await userReq.json();
      console.log({
        userReq,
        userData,
      });
    };

    const createZoomMeeting = async () => {
      const token = jwt.sign(
        {
          iss: process.env.ZOOM_API_KEY,
          exp: 1496091964000,
        },
        process.env.ZOOM_API_SECRET
      );
      const res = await fetch(
        `https://api.zoom.us/v2/users/${process.env.ZOOM_USER_ID}/meetings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "User-Agent": "Zoom-api-Jwt-Request",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            topic: "Topic here",
            type: 2,
            start_time: "2021-09-28T23:00:00.000Z",
            duration: 15,
            timezone: "America/New_York",
            password: "1234",
            agenda: "agenda here",
          }),
        }
      );
      if (res.status === 201) {
        const { id: meetingID } = await res.json();

        const calendarID = makeid(8);

        return {
          statusCode: 200,
          body: JSON.stringify({
            ...body,
            meetingID,
            calendarID,
          }),
        };
      } else {
        throw new Error(`Error while creating Zoom meeting.`, res);
      }
    };

    const googleAuthSetup = async () => {
      const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(process.env.GOOGLE_API_CREDENTIALS),
        scopes: [
          "https://www.googleapis.com/auth/calendar",
          "https://www.googleapis.com/auth/calendar.events",
        ],
      });
      const client = await auth.getClient();
      google.options({ auth: client });
    };

    const listCalendars = async () => {
      const googleCalendar = google.calendar({ version: "v3" });
      const res = await googleCalendar.calendarList.list();
      if (res.statusText === "OK") {
        console.info({
          calendars: res.data.items,
        });
      } else {
        throw new Error(`Error while reading calendars.`, res);
      }
    };

    const deleteCalendar = async (calendarId) => {
      const googleCalendar = google.calendar({ version: "v3" });
      const res = await googleCalendar.calendarList.delete({
        calendarId,
      });
      if (res.statusText === "OK") {
        console.info("Calendar Deleted");
      } else {
        throw new Error(`Error while deleting calendar.`, res);
      }
    };

    const setCalendarAccessControlRule = async () => {
      const googleCalendar = google.calendar({ version: "v3" });
      const res = await googleCalendar.acl.insert({
        calendarId: process.env.GOOGLE_CALENDAR_CALENDAR_ID,
        requestBody: {
          kind: "calendar#aclRule",
          role: "reader",
          scope: {
            type: "default",
          },
        },
      });
      if (res.statusText === "OK") {
        console.info("Rule added successfully.");
      } else {
        throw new Error(`Error while creating rule.`, res);
      }
    };

    const listCalendarEvents = async () => {
      const googleCalendar = google.calendar({
        version: "v3",
      });

      const res = await googleCalendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_CALENDAR_ID,
      });
      if (res.statusText === "OK") {
        console.log(res.data);
      } else {
        throw new Error(`Error while updating calendar event.`, res);
      }
    };

    const getCalendarEvent = async (eventId) => {
      const googleCalendar = google.calendar({
        version: "v3",
      });

      const res = await googleCalendar.events.get({
        calendarId: process.env.GOOGLE_CALENDAR_CALENDAR_ID,
        eventId,
      });
      if (res.statusText === "OK") {
        console.log(res.data);
      } else {
        throw new Error(`Error while updating calendar event.`, res);
      }
    };

    const insertCalendarEvent = async () => {
      const googleCalendar = google.calendar({
        version: "v3",
      });

      const start = moment().add(3, "months");
      const end = start.clone().add(1, "hour");

      const res = await googleCalendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_CALENDAR_ID,
        sendUpdates: "all",
        requestBody: {
          start: {
            dateTime: start.format(),
          },
          end: {
            dateTime: end.format(),
          },
          description: "This is the event description",
          guestsCanInviteOthers: false,
          guestsCanSeeOtherGuests: false,
          location: "123 Main Street",
          summary: "Title of Event",
          visibility: "public",
        },
      });
      if (res.statusText === "OK") {
        console.log(res.data);
      } else {
        throw new Error(`Error while creating calendar event.`, res);
      }

      // const res = await fetch(
      //   `https://oauth2.googleapis.com/token?${new URLSearchParams({
      //     grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      //     assertion: jwtToken,
      //   })}`,
      //   {
      //     method: "POST",
      //     // body: JSON.stringify({
      //     //   grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      //     //   assertion: jwtToken,
      //     // }),
      //   }
      // );

      // const res = await fetch(
      //   `https://www.googleapis.com/calendar/v3/users/me/calendarList`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       Host: "calendar.googleapis.com",
      //     },
      //   }
      // );

      // const googleCalendar = google.calendar({
      //   version: "v3",
      //   auth: `Bearer ${token}`,
      // });
      // const res = await googleCalendar.calendarList.list({
      //   auth: `Bearer ${token}`,
      // });
      // console.log({ res });
      // const res = await googleCalendar.events.insert({
      //   calendarId: process.env.GOOGLE_CALENDAR_CLIENT_ID,

      // })
    };

    const updateCalendarEvent = async (eventId) => {
      const googleCalendar = google.calendar({
        version: "v3",
      });

      const res = await googleCalendar.events.patch({
        calendarId: process.env.GOOGLE_CALENDAR_CALENDAR_ID,
        eventId,
        sendUpdates: "all",
        requestBody: {
          location: `${makeid(4)} Main Street`,
          attendees: [
            {
              email: "tgnemecek@gmail.com",
            },
          ],
        },
      });
      if (res.statusText === "OK") {
        console.log(res.data);
      } else {
        throw new Error(`Error while updating calendar event.`, res);
      }
    };

    try {
      await googleAuthSetup();
      // await listCalendarEvents();
      await updateCalendarEvent("tqnm45cajm54poi6fp10gsqp10");
      // await insertCalendarEvent();
      // await setCalendarAccessControlRule();
    } catch (err) {
      throw err;
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        ...body,
        // meetingID,
        // calendarID,
      }),
    };

    // // Auth
    // const token = `token=${process.env.EVENTBRITE_API_TOKEN}`;
    // const orgId = process.env.EVENTBRITE_ORGANIZATION_ID;

    // const baseUrl = "https://www.eventbriteapi.com/v3/organizations";

    // // Request Params
    // const params = [
    //   "order_by=start_desc",
    //   "status=live,started,ended",
    //   "show_series_parent=on",
    // ];

    // const res = await fetch(
    //   `${baseUrl}/${orgId}/events/?${params.join("&")}&${token}`
    // );

    // if (res.status !== 200) {
    //   return {
    //     statusCode: res.status,
    //     body: JSON.stringify({
    //       error: "Eventbrite API Error",
    //     }),
    //   };
    // }

    // const data = await res.json();
    // const events = data.events
    //   .filter(({ locale, is_series, is_series_parent }) => {
    //     return locale === "en_US";
    //   })
    //   .map(({ url, start, name, description, logo }) => {
    //     return {
    //       url,
    //       date: start.utc,
    //       title: name.text,
    //       description: description.text,
    //       image: logo.original.url,
    //     };
    //   });

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     events,
    //   }),
    // };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};
