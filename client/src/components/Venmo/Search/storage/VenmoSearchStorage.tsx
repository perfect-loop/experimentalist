import { observable, action } from "mobx";
import { Api } from "../../../../util/api";
import { AxiosResponse } from "axios";
import { Venmo } from "models/Venmo";
import logger from "../../../../util/logger";

interface IStateReady {
  kind: "user_found";
  user: Venmo.IVenmoUser;
}

interface IStateNotFound {
  kind: "not_found";
}

interface IStateNotReady {
  kind: "not_ready";
}

interface IStateError {
  kind: "error";
}

interface IStateSearching {
  kind: "searching";
}

interface IStateDone {
  kind: "done";
}

type IState = IStateReady | IStateNotReady | IStateError | IStateSearching | IStateDone | IStateNotFound;

export default class VenmoSearchStorage {
  @observable public state: IState;
  public failedAttempt = 0;
  private api: Api;

  constructor() {
    this.api = new Api();
    this.state = {
      kind: "not_ready",
    };
  }

  @action
  public restart() {
    this.state = {
      kind: "not_ready",
    };
    this.incrementFailedAttempts();
  }

  public failedAttempts() {
    return this.failedAttempt;
  }

  public incrementFailedAttempts() {
    this.failedAttempt = this.failedAttempt + 1;
  }

  @action
  public finish() {
    this.state = { kind: "done" };
  }

  @action
  public search(userId: string) {
    this.state = {
      kind: "searching",
    };
    const body = {
      userId,
    };

    this.api
      .post<Venmo.IVenmoUser, any>("/api/venmo/search.json", body)
      .then((response: AxiosResponse<Venmo.IVenmoUser>) => {
        const { data } = response;
        logger.info("Return data is ", data);
        if (data) {
          this.state = {
            kind: "user_found",
            user: data,
          };
        } else {
          this.state = {
            kind: "not_found",
          };
        }
      })
      .catch(() => {
        this.state = {
          kind: "error",
        };
      });
  }
}
