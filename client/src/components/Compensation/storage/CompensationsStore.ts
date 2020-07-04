import { action, observable } from "mobx";
import { Api } from "../../../util/api";
import { AxiosResponse, AxiosError } from "axios";
import { ICompensation } from "api/Compensations";
import { IUserCompensation } from "../Index/AdminCompensations";

interface IUplodatedData extends Pick<ICompensation, "amount"> {
  email: string;
  amount: number;
}

interface IProcessedData {
  [i: string]: number;
}

export interface IRawUploadedData {
  data: [string, number];
}

export default class CompensationsStore {
  @observable public state: "not_ready" | "ready" | "error";
  @observable public compensations: IUserCompensation[];
  private eventId: string;

  constructor(eventId: string) {
    this.state = "not_ready";
    this.compensations = [];
    this.eventId = eventId;
  }

  @action
  public uploadCSVData = (data: IRawUploadedData[], eventId: string) => {
    // email maps to the amount
    const emailMap: IProcessedData = {};
    data
      .filter((line: IRawUploadedData) => line.data[0] && line.data[1])
      .forEach((line: IRawUploadedData) => {
        emailMap[line.data[0]] = line.data[1];
      });

    const client = new Api({});
    const url = `/api/compensation/${eventId}.json`;
    this.state = "not_ready";

    client
      .post<IUplodatedData[], IProcessedData, AxiosResponse<IUserCompensation[]>>(url, emailMap)
      .then((response: AxiosResponse<IUserCompensation[]>) => {
        this.getAdmin();
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
        this.state = "error";
      });
  };

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
        this.state = "error";
        console.error(error.response?.statusText);
      });
  };

  @action
  public getUser = () => {
    const client = new Api({});
    client
      .get<IUserCompensation[]>(`/api/compensations/${this.eventId}.json`)
      .then((response: AxiosResponse<IUserCompensation[]>) => {
        const { data } = response;
        this.compensations = data;
        this.state = "ready";
      })
      .catch((error: AxiosError) => {
        this.state = "error";
        console.error(error.response?.statusText);
      });
  };
}
