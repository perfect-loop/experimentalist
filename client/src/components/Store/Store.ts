import { action, observable } from "mobx";
import { Api } from "../../util/api";
import { AxiosResponse, AxiosError } from "axios";
import { decode } from "./decode";
import * as Sentry from "@sentry/browser";

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
  public index<T>(decoder?: any) {
    const client = new Api({});
    client
      .get<T[]>(`${this.urlPrefix()}.json`)
      .then((response: AxiosResponse<T[]>) => {
        const { data } = response;
        const es = data[0];
        if (decoder) {
          this.withDecodings<T>(decoder, es, data);
        } else {
          this.setSuccess<T>(data);
        }
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
      });
  }

  @action
  public put(url: string, data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      const client = new Api({});
      client
        .put<T, T>(url, data)
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

  private setSuccess<T>(data: T[]) {
    this.state = {
      kind: "ready",
      data: data,
    };
  }

  private withDecodings<T>(decoder: any, es: T, data: T[]) {
    const value = decode(decoder, es);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    value.subscribe(
      (d: any) => {
        console.log(d);
        this.setSuccess<T>(data);
      },
      (error: any) => {
        console.error(error);
        if (process.env.NODE_ENV === "development") {
          throw error;
        } else {
          Sentry.captureException(error);
        }
      },
    );
  }
}
