import { action, observable } from "mobx";
import { Api } from "../../../util/api";
import { AxiosResponse, AxiosError } from "axios";
import { IParticipation } from "api/Participations";

interface IUploadedData extends Pick<IParticipation, "email"> {
  email: string;
  instructions: string;
}

export interface IRawUploadedData {
  data: [string, string];
}

export default class ParticipantsStore {
  @observable public participations: IParticipation[];
  @observable public state: "not_ready" | "ready" | "error";
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

  @action
  public uploadCVSData = (data: IRawUploadedData[], eventId: string) => {
    const uploadData: IUploadedData[] = data
      .filter((line: IRawUploadedData) => line.data[0] && line.data[1])
      .map((line: IRawUploadedData) => {
        return {
          email: line.data[0],
          instructions: line.data[1],
        };
      });
    const client = new Api({});
    const url = `/api/events/${eventId}/participants.json`;
    this.state = "not_ready";
    client
      .post<IUploadedData[], IUploadedData[], AxiosResponse<IParticipation[]>>(url, uploadData)
      .then((response: AxiosResponse<IParticipation[]>) => {
        const { data } = response;
        this.participations = data;
        this.state = "ready";
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
        this.state = "error";
      });
    console.log(uploadData);
  };
}
