import moment from "moment";
import { EventType } from "types";
import isTicketValid from "./isTicketValid";

type IsEventValidType = (event: {
  tickets: EventType["tickets"];
  date: EventType["date"];
}) => boolean;

const isEventValid: IsEventValidType = ({ tickets, date }) => {
  return tickets.some(({ endsOn }) => isTicketValid(endsOn, date));
};

export default isEventValid;
