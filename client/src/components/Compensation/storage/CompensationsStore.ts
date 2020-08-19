import { action, observable } from "mobx";
import { Api } from "../../../util/api";
import { AxiosResponse, AxiosError } from "axios";
import { ICompensation } from "models/Compensations";
import { IUserCompensation } from "models/Compensations";

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
  @observable public state: "ready" | "not_ready" | "error" | "paying";
  @observable public compensations: IUserCompensation[];
  @observable public error: string;
  private eventId: string;

  constructor(eventId: string) {
    this.state = "not_ready";
    this.compensations = [];
    this.error = "";
    this.eventId = eventId;
  }

  @action
  public uploadCSVData = (data: IRawUploadedData[], eventId: string) => {
    // email maps to the amount
    const emailMap: IProcessedData = {};
    data
      .filter((line: IRawUploadedData) => line.data[0] && line.data[1])
      .forEach((line: IRawUploadedData) => {
        emailMap[line.data[0].toLowerCase()] = line.data[1];
      });

    const client = new Api({});
    const url = `/api/events/${eventId}/compensations.json`;
    this.state = "not_ready";

    client
      .post<IUplodatedData[], IProcessedData, AxiosResponse<IUserCompensation[]>>(url, emailMap)
      .then((response: AxiosResponse<IUserCompensation[]>) => {
        this.getAdmin();
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
        this.state = "error";
        this.error = error.response?.data;
      });
  };

  @action
  public getAdmin = () => {
    const client = new Api({});
    client
      .get<IUserCompensation[]>(`/api/admin/events/${this.eventId}/compensations.json`)
      .then((response: AxiosResponse<IUserCompensation[]>) => {
        const { data } = response;
        this.compensations = data;
        this.state = "ready";
      })
      .catch((error: AxiosError) => {
        this.state = "error";
        this.error = error.response?.data;
        console.error(error.response?.statusText);
      });
  };

  @action
  public getUser = () => {
    const client = new Api({});
    client
      .get<IUserCompensation[]>(`/api/events/${this.eventId}/compensations.json`)
      .then((response: AxiosResponse<IUserCompensation[]>) => {
        const { data } = response;
        this.compensations = data;
        this.state = "ready";
      })
      .catch((error: AxiosError) => {
        this.state = "error";
        this.error = error.response?.data;
        console.error(error.response?.statusText);
      });
  };

  @action
  public pay = (data: any) => {
    this.state = "paying";
    return new Promise((resolve, reject) => {
      const client = new Api({});
      client
        .post(`/api/compensations/${data.compensationId}/pay`, data)
        .then((response: AxiosResponse) => {
          const { data } = response;
          for (let i = 0; i < this.compensations.length; i++) {
            const originalCompensation = this.compensations[i];
            if (originalCompensation.compensation._id === data.compensation) {
              this.compensations[i].transactions.push(data);
              this.compensations[i].compensation.status = "Paid";
            }
          }
          this.state = "ready";
        })
        .catch((error: AxiosError) => {
          this.state = "error";
          this.error = error.response?.data || "Payment error";
        });
    });
  };
}
