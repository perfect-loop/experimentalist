import { action, observable } from "mobx";
import { Api } from "../../../util/api";
import { AxiosResponse, AxiosError } from "axios";
import { IUserCompensation } from "models/Compensations";
import { IUploadedData, IProcessedData, IRawUploadedData, validateCurrency } from "./helpers";

export default class CompensationsStore {
  @observable public state: "ready" | "not_ready" | "error" | "paying";
  @observable public compensations: IUserCompensation[];
  @observable public error: string;
  @observable public uploadWithErrors: IRawUploadedData[];
  private eventId: string;

  constructor(eventId: string) {
    this.state = "not_ready";
    this.compensations = [];
    this.error = "";
    this.eventId = eventId;
    this.uploadWithErrors = [];
  }

  @action
  public uploadCSVData = (data: IRawUploadedData[], eventId: string) => {
    // email maps to the amount and currency
    const emailMap: IProcessedData = {};
    data
      .filter((line: IRawUploadedData) => line.data[0] && line.data[1])
      .forEach((line: IRawUploadedData) => {
        emailMap[line.data[0].toLowerCase().trim()] = {
          amount: line.data[1],
          currency: line.data[2]?.trim(),
        };
      });

    const client = new Api({});
    const url = `/api/events/${eventId}/compensations.json`;
    this.state = "not_ready";

    client
      .post<IUploadedData[], IProcessedData, AxiosResponse<IUserCompensation[]>>(url, emailMap)
      .then(() => {
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
    return new Promise(() => {
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

  @action
  public closeErrorAlerts = () => {
    this.uploadWithErrors = [];
  };

  public validateData = (rawUploadedData: IRawUploadedData[], method: string) => {
    return rawUploadedData.map(uploadedData => {
      const { data } = uploadedData;

      if (!data[1]) {
        return uploadedData;
      }

      const currency = data[2]?.toUpperCase()?.trim();

      if (!currency) {
        return uploadedData;
      }

      validateCurrency(currency, method, uploadedData);

      return uploadedData;
    });
  };
}
