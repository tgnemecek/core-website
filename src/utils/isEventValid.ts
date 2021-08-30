import { Event } from "types";
import isTicketValid from "./isTicketValid";

type IsEventValid = (event: {
  tickets: Event["tickets"];
  date: Event["date"];
}) => boolean;

const isEventValid: IsEventValid = ({ tickets, date }) => {
  return tickets.some(({ endsOn }) => isTicketValid(endsOn, date));
};

export default isEventValid;
