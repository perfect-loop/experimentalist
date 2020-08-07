import { define, random } from "cooky-cutter";
import faker from "faker";
import { EventFactory } from "./EventFactory";
import { IEventSettings } from "api/EventSettings";

export const EventSettingsFactory = define<IEventSettings>({
  _id: "hjgsuil",
  introVideo: "https://player.vimeo.com/video/347119375?color=ef2200&byline=0&portrait=0",
  event: EventFactory(),
  createdAt: new Date(),
  updatedAt: new Date(),
});
