import React from "react";
import { Event } from "types";

export type EventContext = {
  event: Event;
  priceRange: string;
  alreadyPurchased: boolean;
  setAlreadyPurchased: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTicketsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EventContext = React.createContext<EventContext | null>(null);

export default EventContext;
