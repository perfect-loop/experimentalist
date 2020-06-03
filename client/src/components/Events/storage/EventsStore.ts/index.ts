import { action, observable } from "mobx"
import API from "api"
import { Api } from "../../../../util/api";
import { AxiosResponse, AxiosError } from "axios";

export default class EventsStore {
  @observable public events: API.IEvent[];
  @observable public state: "not_ready" | "ready";

  constructor() {
    this.events = [];
    this.state = "not_ready"
  }

  @action
  public getEvents = () => {
    const client = new Api({});
    client
      .get<API.IEvent[]>("/api/events.json")
      .then((response: AxiosResponse<API.IEvent[]>) => {
        const { data } = response;
        this.events = data;
        this.state = "ready";
      })
      .catch((error: AxiosError) => {
      });
  };
}