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
  verifyEmail: (email) => {
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regex.test(email);
  },
};