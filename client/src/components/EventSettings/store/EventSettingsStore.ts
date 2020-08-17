import Store from "../../Store/Store";
import { IEventSettings } from "models/EventSettings";
import { action } from "mobx";

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
}
