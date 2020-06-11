import { Component } from "react";
import React from "react";
import AllEvents from "./AllEvents";
import { observer } from "mobx-react";
import NewPopup from "../Floaty/NewPopup";
import ParticipantsStore from "../../VideoConference/store/ParticipantsStore";

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
    return (
      <>
        <NewPopup />
        <AllEvents participationsStore={this.state.participationsStore} />
      </>
    );
  }
}
