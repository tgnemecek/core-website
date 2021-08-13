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

<<<<<<< HEAD
const EventContext = React.createContext<EventContext | null>(null);
=======
const EventContext = React.createContext<EventContextType>(null);
>>>>>>> @{-1}

export default EventContext;
