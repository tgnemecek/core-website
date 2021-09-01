import { isBefore, startOfDay, add } from "date-fns";
import { Ticket } from "types";

type IsTicketValid = (endsOn: Ticket["endsOn"], eventDate: Date) => boolean;

const isTicketValid: IsTicketValid = (endsOn, eventDate) => {
  const now = new Date();

  if (endsOn === "oneWeek") {
    const afterOneWeek = add(now, {
      weeks: 1,
    });

    return isBefore(afterOneWeek, eventDate);
  }
  if (endsOn === "startOfDay") {
    const startOfThisDay = startOfDay(eventDate);

    return isBefore(now, startOfThisDay);
  }
  if (endsOn === "startOfEvent") {
    return isBefore(now, eventDate);
  }
  return false;
};

export default isTicketValid;
