import { observable, action } from "mobx";
import { notStarted, error, IState } from "./Types";

export default class FileUploadStore {
  @observable state: IState;

  constructor() {
    this.state = notStarted();
  }

  @action
  public notStarted = () => {
    this.state = notStarted();
  };

  @action
  public error = (message: string) => {
    this.state = error(message);
  };
}
