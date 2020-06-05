import { action, observable } from "mobx";
import { Api } from "../../../util/api";
import { AxiosResponse, AxiosError } from "axios";
import { IParticipation } from "api/Participations";

export default class ParticipantsStore {
  @observable public participations: IParticipation[];
  @observable public state: "not_ready" | "ready";
  private eventId: string;

  constructor(eventId: string) {
    this.participations = [];
    this.state = "not_ready";
    this.eventId = eventId;
  }

  @action
  public get = () => {
    const client = new Api({});
    client
      .get<IParticipation[]>(`/api/events/${this.eventId}/participants.json`)
      .then((response: AxiosResponse<IParticipation[]>) => {
        const { data } = response;
        this.participations = data;
        this.state = "ready";
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
      });
  };
}
