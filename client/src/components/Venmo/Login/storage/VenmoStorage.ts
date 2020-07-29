import { observable, action } from "mobx";
import { Api } from "../../../../util/api";
import { Venmo } from "api/Venmo";

interface IStateLogin {
  kind: "not_started";
}

interface IStateLoggingIn {
  kind: "logging_in";
}

interface IState2FARequested {
  kind: "2fa_requested";
}

interface IState2FASubmitted {
  kind: "2fa_submitted";
}

interface IStateDone {
  kind: "done";
}

interface IStateError {
  kind: "error";
}

interface IStateMethods {
  kind: "methods";
  methods: Venmo.IPaymentMethod[];
}

type IState =
  | IStateLogin
  | IStateLoggingIn
  | IState2FARequested
  | IState2FASubmitted
  | IStateMethods
  | IStateDone
  | IStateError;

export default class VenmoStorage {
  @observable public state: IState;
  private api: Api;

  constructor() {
    this.api = new Api();
    this.state = {
      kind: "not_started",
    };
  }

  @action
  public selectMethod(id: string) {
    this.state = {
      kind: "logging_in",
    };

    const body = {
      id,
    };
    this.api
      .post(`/api/venmo/methods/${id}.json`, body)
      .then(() => {
        this.state = {
          kind: "done",
        };
      })
      .catch(() => {
        this.state = {
          kind: "error",
        };
      });
  }

  @action
  public login(username: string, password: string) {
    this.state = {
      kind: "logging_in",
    };
    const body = {
      username,
      password,
    };
    this.api
      .post("/api/venmo.json", body)
      .then(() => {
        this.state = {
          kind: "2fa_requested",
        };
      })
      .catch(() => {
        this.state = {
          kind: "error",
        };
      });
  }

  @action
  public verifyMFA(code: number) {
    this.state = {
      kind: "2fa_submitted",
    };
    const body = {
      venmoOtp: code,
    };
    this.api
      .post<Venmo.IPaymentMethod[], {}>("/api/venmo/mfa.json", body)
      .then(data => {
        this.state = {
          kind: "methods",
          methods: data.data,
        };
      })
      .catch(() => {
        this.state = {
          kind: "error",
        };
      });
  }
}
