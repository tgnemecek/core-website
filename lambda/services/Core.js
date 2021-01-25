const moment = require("moment");
const Stripe = require("./Stripe");

module.exports = {
  compareDates: (startDate, meeting) => {
    const currentDate = moment(meeting.start_time);
    const newDate = moment(startDate);
    return !currentDate.isSame(newDate);
  },
  comparePrices: (tickets, prices) => {
    return tickets.some((ticket) => {
      if (!ticket.id) return true;
      const foundPrice = prices.find((price) => price.id === ticket.id);

      if (!foundPrice) return true;

      return Stripe.formatPrice(ticket.price) != foundPrice.unit_amount;
    });
  },
  generateCalendarLink: (event) => {
    const required = ["title", "description", "startDate", "endDate"];

    const invalid = required.filter((key) => !event[key]);

    if (invalid.length > 0) {
      throw new Error(
        `Error in Core.generateCalendarLink(). Required fields missing: ${invalid.join(
          ", "
        )}.`
      );
    }

    const formatDate = (input) => {
      return moment(input).utcOffset(0).format("YYYYMMDDTHHmmss") + "Z";
    };

    const { title, description, location, startDate, endDate } = event;

    const searchParams = new URLSearchParams({
      text: title,
      details: description,
      location: location || "",
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    });

    const prefix = `https://www.google.com/calendar/render?action=TEMPLATE&`;

    return `${prefix}${searchParams.toString()}`;
  },
};
