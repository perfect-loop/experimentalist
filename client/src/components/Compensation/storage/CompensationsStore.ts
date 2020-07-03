import { action, observable } from "mobx";
import { Api } from "../../../util/api";
import { AxiosResponse, AxiosError } from "axios";
import { ICompensation } from "api/Compensations";
import { IUserCompensation } from "../Index/AdminCompensations";

// interface IUplodatedData extends Pick<ICompensation>{
//   amount: number;
//   name: string;
// }

export default class CompensationsStore {
  @observable public state: "not_ready" | "ready" | "error";
  @observable public compensations: IUserCompensation[];
  private eventId: string;

  constructor(eventId: string) {
    this.state = "not_ready";
    this.compensations = [];
    this.eventId = eventId;
  }

  // @action
  // public post = (data: IProfile): Promise<IProfile> => {
  //   return new Promise((resolve, reject) => {
  //     const client = new Api({});
  //     client
  //       .post<IProfile, IProfile>("/api/profile.json", data)
  //       .then((response: AxiosResponse<IProfile>) => {
  //         const { data } = response;
  //         this.state = {
  //           kind: "ready",
  //           model: data,
  //         };
  //         resolve(data);
  //       })
  //       .catch((error: AxiosError) => {
  //         console.error(error.response?.statusText);
  //         reject(error);
  //       });
  //   });
  // };

  @action
  public getAdmin = () => {
    const client = new Api({});
    client
      .get<IUserCompensation[]>(`/api/my/compensations/${this.eventId}.json`)
      .then((response: AxiosResponse<IUserCompensation[]>) => {
        const { data } = response;
        this.compensations = data;
        this.state = "ready";
      })
      .catch((error: AxiosError) => {
        this.state =  "error";
        console.error(error.response?.statusText);
      });
  };
}
