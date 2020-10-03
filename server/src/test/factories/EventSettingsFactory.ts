import { EventFactory } from "./EventFactory";
import { IEventSettings, EventSettings } from "models/EventSettings";

export function EventSettingsFactory(params: any): IEventSettings {
  const p = {
    introVideo:
      "https://player.vimeo.com/video/347119375?color=ef2200&byline=0&portrait=0",
    requireId: true,
    event: EventFactory(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  const eventSettings = new EventSettings({ ...p, ...params });
  return eventSettings;
}
