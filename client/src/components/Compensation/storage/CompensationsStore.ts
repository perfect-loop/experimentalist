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
interface IStateReady {
  kind: "ready";
  model: IUserCompensation[];
}

interface IStateNotReady {
  kind: "not_ready";
}
interface IStateError {
  kind: "error";
  model: string | undefined;
}

type IState = IStateReady | IStateNotReady | IStateError;

export default class CompensationsStore {
  @observable public state: IState;
  // @observable public compensations: IUserCompensation[];
  private eventId: string;

  constructor(eventId: string) {
    this.state = {
      kind: "not_ready",
    };
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
    this.state = {
      kind: "not_ready",
    };

    client
      .post<IUplodatedData[], IProcessedData, AxiosResponse<IUserCompensation[]>>(url, emailMap)
      .then((response: AxiosResponse<IUserCompensation[]>) => {
        this.getAdmin();
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
        this.state = {
          kind: "error",
          model: error.response?.data,
        };
      });
  };

  @action
  public getAdmin = () => {
    const client = new Api({});
    client
      .get<IUserCompensation[]>(`/api/my/compensations/${this.eventId}.json`)
      .then((response: AxiosResponse<IUserCompensation[]>) => {
        const { data } = response;
        this.state = {
          kind: "ready",
          model: data,
        };
      })
      .catch((error: AxiosError) => {
        this.state = {
          kind: "error",
          model: error.response?.data,
        };
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
        this.state = {
          kind: "ready",
          model: data,
        };
      })
      .catch((error: AxiosError) => {
        this.state = {
          kind: "error",
          model: error.response?.data,
        };
        console.error(error.response?.statusText);
      });
  };
}
