import moment from "moment";
import { EventType } from "types";

type GetEventStatusProps = {
  tickets: EventType["tickets"];
  date: EventType["date"];
};

const getEventStatus = ({ tickets, date }: GetEventStatusProps) => {
  const now = moment();

  const ticketsStillValid = tickets.filter(({ endsOn }) => {
    const startOfEvent = moment(date);
    if (endsOn === "startOfEvent") {
      return now.isBefore(startOfEvent);
    }
    if (endsOn === "startOfDay") {
      const startOfDay = startOfEvent.clone();
      startOfDay.startOf("day");

      return now.isBefore(startOfDay);
    }
    if (endsOn === "oneWeek") {
      const oneWeek = startOfEvent.clone();
      oneWeek.subtract(1, "week");

      return now.isBefore(oneWeek);
    }
    return false;
  });

  return Boolean(ticketsStillValid.length);
};

export default getEventStatus;
