import { useRef, useEffect } from "react";
import { useLocation } from "@reach/router";

type EventsCache = {
  id?: string;
  ticketIds?: string[];
};

const initialState: EventsCache = {
  id: undefined,
  ticketIds: undefined,
};

// This is needed to store the ids retrieved from the BE when creating a new event
const useEventsCache = () => {
  const { href } = useLocation();

  const cache = useRef<EventsCache>({ ...initialState });

  useEffect(() => {
    cache.current = { ...initialState };
  }, [href]);

  return cache;
};

export default useEventsCache;
