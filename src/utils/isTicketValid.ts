import moment from "moment";
import { Ticket } from "types";

type IsTicketValid = (
  endsOn: Ticket["endsOn"],
  eventDate: Date | moment.Moment
) => boolean;

const isTicketValid: IsTicketValid = (endsOn, eventDate) => {
  const now = moment();

  if (endsOn === "oneWeek") {
    return now.add(1, "week").isBefore(eventDate);
  }
  if (endsOn === "startOfDay") {
    return now.isBefore(moment(eventDate).startOf("day"));
  }
  if (endsOn === "startOfEvent") {
    return now.isBefore(eventDate);
  }
  return false;
};

export default isTicketValid;
