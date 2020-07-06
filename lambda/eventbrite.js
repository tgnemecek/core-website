const fetch = require("node-fetch");

module.exports.handler = async (event, context) => {
  console.log("queryStringParameters", event.queryStringParameters);

  const token = process.env.EVENTBRITE_TOKEN;
  const orgId = process.env.ORGANIZATION_ID;

  const res = await fetch(
    `https://www.eventbriteapi.com/v3/organizations/${orgId}/events/?token=${token}`
  );

  if (res.status !== 200) {
    return {
      statusCode: res.status,
      body: JSON.stringify({
        error: "Eventbrite API Error",
      }),
    };
  }

  const data = await res.json();
  const events = data.events
    .filter(({ status }) => status !== "canceled")
    .map(({ url, start, name, description, logo }) => {
      return {
        url,
        date: start.utc,
        title: name.text,
        description: description.text,
        image: logo.original.url,
      };
    });

  return {
    statusCode: 200,
    body: JSON.stringify({
      events,
    }),
  };
};
