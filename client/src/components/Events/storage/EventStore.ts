import { action, observable } from "mobx";
import { Api } from "../../../util/api";
import { AxiosResponse, AxiosError } from "axios";
import { IEvent } from "api/Events";

interface IStateReady {
  kind: "ready";
  model: IEvent;
}

interface IStateNotReady {
  kind: "not_ready";
}

type IState = IStateReady | IStateNotReady;

export default class EventStore {
  @observable public state: IState;

  constructor() {
    this.state = {
      kind: "not_ready",
    };
  }

  @action
  public post = (data: IEvent): Promise<IEvent> => {
    return new Promise((resolve, reject) => {
      const client = new Api({});
      client
        .post<IEvent, IEvent>("/api/events.json", data)
        .then((response: AxiosResponse<IEvent>) => {
          const { data } = response;
          this.state = {
            kind: "ready",
            model: data,
          };
          resolve(data);
        })
        .catch((error: AxiosError) => {
          console.error(error.response?.statusText);
          reject(error);
        });
    });
  };

  @action
  public get = (id: string) => {
    const client = new Api({});
    client
      .get<IEvent>(`/api/events/${id}.json`)
      .then((response: AxiosResponse<IEvent>) => {
        const { data } = response;
        this.state = {
          kind: "ready",
          model: data,
        };
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
      });
  };
}
