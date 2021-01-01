module.exports.handler = async (event, context) => {
  const fetch = require("node-fetch");
  try {
    return true;
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
    return err;
  }
};
