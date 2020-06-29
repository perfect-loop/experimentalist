import { action, observable } from "mobx";
import { Api } from "../../../util/api";
import { AxiosResponse, AxiosError } from "axios";
import { IProfile } from "api/Profiles";
import { resolve } from "path";
import { rejects } from "assert";

interface IStateReady {
  kind: "ready";
  model: IProfile;
}

interface IStateNotReady {
  kind: "not_ready";
}
interface IStateEmpty {
  kind: "empty";
}

type IState = IStateReady | IStateNotReady | IStateEmpty;

export default class ProfileStore {
  @observable public state: IState;

  constructor() {
    this.state = {
      kind: "not_ready",
    };
  }

  @action
  public post = (data: IProfile): Promise<IProfile> => {
    return new Promise((resolve, reject) => {
      const client = new Api({});
      client
        .post<IProfile, IProfile>("/api/profile.json", data)
        .then((response: AxiosResponse<IProfile>) => {
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
  public get = () => {
    const client = new Api({});
    client
      .get<IProfile>(`/api/profile.json`)
      .then((response: AxiosResponse<IProfile>) => {
        const { data } = response;

        this.state = {
          kind: "ready",
          model: data,
        };
      })
      .catch((error: AxiosError) => {
        this.state = {
          kind: "empty",
        };
        console.error(error.response?.statusText);
      });
  };
}