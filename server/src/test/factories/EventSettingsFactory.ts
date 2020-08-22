import { define, random } from "cooky-cutter";
import faker from "faker";
import { EventFactory } from "./EventFactory";
import { IEventSettings, EventSettings } from "models/EventSettings";

const eventSettings: IEventSettings = new EventSettings({
  introVideo:
    "https://player.vimeo.com/video/347119375?color=ef2200&byline=0&portrait=0",
  requireId: true,
  event: EventFactory(),
  createdAt: new Date(),
  updatedAt: new Date()
});

export function EventSettingsFactory(): IEventSettings {
  return eventSettings;
}
