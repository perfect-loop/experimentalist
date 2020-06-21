import { observable, action } from "mobx";
import { Api } from "../../../util/api";
import { AxiosResponse, AxiosError } from "axios";
import { IParticipation } from "api/Participations";

interface ISignatureResponse {
  signature: string;
}

interface IStateReady {
  kind: "ready";
  signature: string;
  participant: IParticipation;
}

interface IStateNotReady {
  kind: "not_ready";
  participant: IParticipation;
}

type IState = IStateReady | IStateNotReady;

export default class ConferenceStore {
  @observable public state: IState;
  private url: string;

  constructor(participant: IParticipation) {
    this.state = {
      kind: "not_ready",
      participant,
    };
    this.url = `/api/zoom/${participant._id}/signature.json`;
  }

  @action
  public get = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const client = new Api({});
      client
        .get<ISignatureResponse>(this.url)
        .then((response: AxiosResponse<ISignatureResponse>) => {
          this.state = {
            kind: "ready",
            signature: response.data.signature,
            participant: this.state.participant,
          };
          return resolve(response.data.signature);
        })
        .catch((error: AxiosError) => {
          console.error(error.response?.statusText);
          return reject(error.response?.statusText);
        });
    });
  };
}
