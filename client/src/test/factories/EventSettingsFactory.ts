import { define } from "cooky-cutter";
import { EventFactory } from "./EventFactory";
import { IEventSettings } from "models/EventSettings";

export const EventSettingsFactory = define<IEventSettings>({
  _id: "hjgsuil",
  introVideo: "https://player.vimeo.com/video/347119375?color=ef2200&byline=0&portrait=0",
  requireId: true,
  paymentMethod: "venmo",
  event: EventFactory(),
  intelligentReadmit: true,
  showInstructions: true,
  videoStartTime: new Date(),
  videoEndTime: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
});
