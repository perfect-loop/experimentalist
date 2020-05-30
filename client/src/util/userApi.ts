import { Api } from "./api";
import { AxiosRequestConfig } from "axios";

export class UserApi extends Api {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }
}
