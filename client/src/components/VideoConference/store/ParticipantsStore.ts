import { action, observable } from "mobx";
import { Api } from "../../../util/api";
import { AxiosResponse, AxiosError } from "axios";
import { IParticipation } from "models/Participations";

interface IStateReady {
  kind: "ready";
  models: IParticipation[];
}

interface IStateNotReady {
  kind: "not_ready";
}

type IState = IStateReady | IStateNotReady;

export default class ParticipantsStore {
  @observable public state: IState;
  private eventId: string | undefined;

  constructor(eventId?: string) {
    this.state = {
      kind: "not_ready",
    };
    this.eventId = eventId;
  }

  @action
  public get = () => {
    const client = new Api({});
    client
      .get<IParticipation[]>(this.url())
      .then((response: AxiosResponse<IParticipation[]>) => {
        const { data } = response;
        this.state = {
          kind: "ready",
          models: data,
        };
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
      });
  };

  public url = () => {
    if (this.eventId) {
      return `/api/my/participants.json?eventId=${this.eventId}`;
    } else {
      return `/api/my/participants.json`;
    }
  };
}
