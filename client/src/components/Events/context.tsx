import React, { useContext } from "react";
import { EventSettingsStore } from "../EventSettings/store/EventSettingsStore";

interface ConferenceContextOptions {
  eventSettingsStore: EventSettingsStore;
}

interface EventProviderOptions {
  children: React.ReactElement;
  eventSettingsStore: EventSettingsStore;
}

export const EventContext = React.createContext<ConferenceContextOptions | null>(null);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useEventContext = () => useContext(EventContext)!;
export const EventProvider = ({ children, eventSettingsStore }: EventProviderOptions) => {
  return (
    <EventContext.Provider
      value={{
        eventSettingsStore,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
