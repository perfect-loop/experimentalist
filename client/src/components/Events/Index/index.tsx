import { Component } from "react";
import React from "react";
import AllEvents from "./AllEvents";
import { observer } from "mobx-react";
import NewPopup from "../Floaty/NewPopup";
import ParticipantsStore from "../../VideoConference/store/ParticipantsStore";
import { Alert, AlertTitle } from "@material-ui/lab";
import Broadcast from "../../Broadcast";

interface IState {
  participationsStore: ParticipantsStore;
}

@observer
export default class Index extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    const participationsStore = new ParticipantsStore();
    this.state = {
      participationsStore: participationsStore,
    };
    participationsStore.get();
  }

  public render() {
    switch (this.state.participationsStore.state.kind) {
      case "not_ready": {
        return <div>Loading</div>;
      }
      case "ready": {
        if (this.state.participationsStore.state.models.length > 0) {
          return (
            <>
              <NewPopup />
              <AllEvents participationsStore={this.state.participationsStore} />
            </>
          );
        } else {
          return (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              There are no experiments associated with this email address. Please login with the email address you
              provided during experiment registration.
            </Alert>
          );
        }
      }
    }
  }
}
