import { action, observable } from "mobx";
import { Api } from "../../../util/api";
import { AxiosResponse, AxiosError } from "axios";
import { IEvent } from "models/Events";

export default class EventsStore {
  @observable public events: IEvent[];
  @observable public state: "not_ready" | "ready";

  constructor() {
    this.events = [];
    this.state = "not_ready";
  }

  @action
  public getEvents = () => {
    const client = new Api({});
    client
      .get<IEvent[]>("/api/events.json")
      .then((response: AxiosResponse<IEvent[]>) => {
        const { data } = response;
        this.events = data;
        this.state = "ready";
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
      });
  };
}
