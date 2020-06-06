import { Component } from "react";
import React from "react";
import { observer } from "mobx-react";
import EventStore from "../storage/EventStore";
import AllParticipants from "./AllParticipants";
import ParticipantsStore, { IRawUploadedData } from "../storage/ParticipantsStore";
import { CSVReader } from "react-papaparse";

interface IState {
  participantsStore: ParticipantsStore;
  eventStore: EventStore;
}

interface IProps {
  eventId: string;
}

@observer
export default class Index extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const store = new ParticipantsStore(props.eventId);
    const e = new EventStore();
    this.state = {
      participantsStore: store,
      eventStore: e,
    };
    store.get();
    e.get(props.eventId);
  }

  private handleOnDrop = (data: IRawUploadedData[]) => {
    // remove header elements
    data.shift();
    this.state.participantsStore.uploadCVSData(data, this.props.eventId);
  };

  public render() {
    return (
      <>
        <AllParticipants participantsStore={this.state.participantsStore} eventStore={this.state.eventStore} />
        <CSVReader onDrop={this.handleOnDrop} style={{}} config={{}}>
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </>
    );
  }
}
