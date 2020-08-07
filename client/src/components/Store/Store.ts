import { action, observable } from "mobx";
import { Api } from "../../util/api";
import { AxiosResponse, AxiosError } from "axios";

interface IStateReady {
  kind: "ready";
  data: any;
}

interface IStateNotReady {
  kind: "not_ready";
}

type IState = IStateReady | IStateNotReady;

export default abstract class Store<T> {
  @observable public state: IState;

  constructor() {
    this.state = {
      kind: "not_ready",
    };
  }

  abstract urlPrefix(): string;

  @action
  public post(data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      const client = new Api({});
      client
        .post<T, T>(`${this.urlPrefix()}.json`, data)
        .then((response: AxiosResponse<T>) => {
          const { data } = response;
          this.state = {
            kind: "ready",
            data,
          };
          resolve(data);
        })
        .catch((error: AxiosError) => {
          console.error(error.response?.statusText);
          reject(error);
        });
    });
  }

  @action
  public index<T>() {
    const client = new Api({});
    client
      .get<T[]>(`${this.urlPrefix()}.json`)
      .then((response: AxiosResponse<T[]>) => {
        const { data } = response;
        this.state = {
          kind: "ready",
          data,
        };
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
      });
  }
}
