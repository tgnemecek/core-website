export type EventDeleteBody = {
  id: string;
};

export type EventCreateBody = EventDeleteBody & {
  title: string;
  subtitle: string;
  tickets: Ticket[];
  duration: number;
  date: Date;
};

export type EventUpdateBody = EventCreateBody;

export type CreatePaymentIntentBody = {
  ticketId: string;
  title: string;
  timezone: string;
};

export type Ticket = {
  id: string;
  description: string;
  price: number;
  endsOn: "startOfEvent" | "startOfDay" | "oneWeek";
  extra: string;
};
