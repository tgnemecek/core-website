import React from "react";
import { EventType } from "types";

export type EventContextType = {
  event: EventType;
  priceRange: string;
  alreadyPurchased: boolean;
  setAlreadyPurchased: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTicketsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EventContext = React.createContext<EventContextType>(null);

export default EventContext;
