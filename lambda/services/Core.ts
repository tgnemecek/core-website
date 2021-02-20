import moment from "moment";
import StripeApi from "stripe";
import { TicketType } from "../types";

type GenerateCalendarLinkProps = {
  title: string;
  description: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  location?: string;
};

const Core = {
  compareTickets: (tickets: TicketType[], prices: StripeApi.Price[]) => {
    if (tickets.length !== prices.length) return true;
    const hasChanged = tickets.some((ticket) => {
      const found = prices.find((price) => price.id === ticket.id);
      if (!found) return true;
      return ticket.price * 100 !== found.unit_amount;
    });
    return hasChanged;
  },
  compareDates: (newDate: moment.Moment, oldDate: moment.Moment) => {
    return !newDate.isSame(oldDate);
  },
  generateCalendarLink: (event: GenerateCalendarLinkProps) => {
    const required = ["title", "description", "startDate", "endDate"] as const;

    const invalid = required.filter((key) => !event[key]);

    if (invalid.length > 0) {
      throw new Error(
        `Error in Core.generateCalendarLink(). Required fields missing: ${invalid.join(
          ", "
        )}.`
      );
    }

    const formatDate = (input: moment.Moment) => {
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
  verifyEmail: (email: string) => {
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regex.test(email);
  },
};

export default Core;
