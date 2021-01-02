const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const kloudless = require("kloudless")(process.env.KLOUDLESS_CALENDAR_API_KEY);

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
  console.log("HERE!");
  try {
    const body = JSON.parse(event.body || "{}");

    const token = jwt.sign(
      {
        iss: process.env.ZOOM_API_KEY,
        exp: 1496091964000,
      },
      process.env.ZOOM_API_SECRET
    );

    console.log(context.clientContext);

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

    return;

    const cal = await fetch(
      `https://api.kloudless.com/v1/accounts/${process.env.KLOUDLESS_ACCOUNT_ID}/cal/calendars/${process.env.GOOGLE_CALENDAR_ID}/events/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.KLOUDLESS_CALENDAR_BEARER_TOKEN}`,
        },
      }
    );

    const calData = await cal.json();

    console.log(context.clientContext);

    // console.dir(
    //   {
    //     status: cal.status,
    //     calData,
    //   },
    //   { depth: null }
    // );

    return;

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

      // function initClient() {
      //   google.client.init({
      //     apiKey: API_KEY,
      //     clientId: CLIENT_ID,
      //     discoveryDocs: DISCOVERY_DOCS,
      //     scope: SCOPES
      //   }).then(function () {
      //     // Listen for sign-in state changes.
      //     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      //     // Handle the initial sign-in state.
      //     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      //     authorizeButton.onclick = handleAuthClick;
      //     signoutButton.onclick = handleSignoutClick;
      //   }, function(error) {
      //     appendPre(JSON.stringify(error, null, 2));
      //   });
      // }

      console.log({ meetingID });

      const calendarID = makeid(8);

      return {
        statusCode: 200,
        body: JSON.stringify({
          ...body,
          meetingID,
          calendarID,
        }),
      };
    }

    console.log({ res });

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
