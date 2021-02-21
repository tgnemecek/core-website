export type EventDeleteBody = {
  meetingId: number;
  productId: string;
  isOnline: boolean;
};

export type EventCreateBody = EventDeleteBody & {
  title: string;
  subtitle: string;
  tickets: TicketType[];
  duration: number;
  date: Date;
};

export type EventUpdateBody = EventCreateBody;

export type CreatePaymentIntentBody = {
  ticketId: string;
  title: string;
  timezone: string;
};

export type TicketType = {
  id: string;
  description: string;
  price: number;
  endsOn: "startOfEvent" | "startOfDay" | "oneWeek";
  extra: string;
};
