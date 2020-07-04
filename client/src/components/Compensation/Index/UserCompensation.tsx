import React, { Component } from "react";
import { observer } from "mobx-react";
import CompensationsStore from "../storage/CompensationsStore";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle/AlertTitle";
import CompensationsTable from "./CompensationTable";

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
    if (this.state.compensationsStore.state === "error") {
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Unable to load compensation. Please make sure there are no duplicate entries
        </Alert>
      );
    } else if (this.state.compensationsStore.state === "ready") {
      return (
        <>
          <div>
            <h2>Compensation</h2>
            <h3>Your Compensation ${this.state.compensationsStore.compensations[0].compensation.amount}</h3>
          </div>
        </>
      );
    } else {
      return <>Loading</>;
    }
  }
}

export default UserCompensation;
