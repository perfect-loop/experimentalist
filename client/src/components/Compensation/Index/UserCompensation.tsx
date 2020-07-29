import React, { Component } from "react";
import { observer } from "mobx-react";
import CompensationsStore from "../storage/CompensationsStore";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle/AlertTitle";
import { ITransaction } from "api/Transactions";

interface IProps {
  eventId: string;
}

interface IState {
  compensationsStore: CompensationsStore;
}

@observer
class UserCompensation extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const compensationsStore = new CompensationsStore(props.eventId);
    this.state = {
      compensationsStore: compensationsStore,
    };
    compensationsStore.getUser();
  }

  public render() {
    const { state, compensations, error } = this.state.compensationsStore;
    if (state === "error") {
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      );
    } else if (state === "ready") {
      return (
        <>
          <div>
            <h2>Compensation</h2>
            <h3>Your Compensation ${compensations[0].compensation.amount}</h3>
          </div>
          <div className="">
            <h2>Transactions</h2>
            {compensations[0].transactions.map((t: ITransaction) => {
              return (
                <>
                  <h3>{t.date.split("T")[0]}</h3>
                  <h3>{t._id}</h3>
                  <h3>{t.method}</h3>
                </>
              );
            })}
          </div>
        </>
      );
    } else {
      return <>Loading</>;
    }
  }
}

export default UserCompensation;
