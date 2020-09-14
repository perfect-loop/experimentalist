import Store from "../../Store/Store";
import { IEventSettings } from "models/EventSettings";
import { action } from "mobx";
import { EventSettingsType } from "models/decoders/EventSettings";

export class EventSettingsStore extends Store<IEventSettings> {
  public eventId: string;

  constructor(eventId: string) {
    super();
    this.eventId = eventId;
  }

  @action
  urlPrefix(): string {
    return `/api/events/${this.eventId}/eventSettings`;
  }

  public index<T>() {
    return super.index<T>();
  }
}
