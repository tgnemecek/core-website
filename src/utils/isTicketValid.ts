import moment from "moment";
import { TicketType } from "types";

type IsTicketValidType = (
  endsOn: TicketType["endsOn"],
  eventDate: Date | moment.Moment
) => boolean;

const isTicketValid: IsTicketValidType = (endsOn, eventDate) => {
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
