import { Component } from "react";
import React from "react";
import { observer } from "mobx-react";
import EventStore from "../storage/EventStore";
import AllParticipants from "./AllParticipants";
import ParticipantsStore, { IRawUploadedData } from "../storage/ParticipantsStore";
import FileUploadStore from "../../FileUpload/store/FileUploadStore";
import { CSVReader } from "react-papaparse";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle/AlertTitle";
import { Example } from "./Example";
import FileUploadError from "../../FileUpload/FileUploadError";
import { FileData, isCSVFile } from "../../FileUpload/store/Types";

interface IState {
  participantsStore: ParticipantsStore;
  eventStore: EventStore;
}

interface IProps {
  eventId: string;
}

@observer
export default class Index extends Component<IProps, IState> {
  fileUploadStore = new FileUploadStore();
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

  private handleOnDrop = (data: IRawUploadedData[], file: FileData) => {
    this.fileUploadStore.notStarted();
    if (isCSVFile(file.name)) {
      // remove header elements
      data.shift();
      this.state.participantsStore.uploadCVSData(data, this.props.eventId);
    } else {
      this.fileUploadStore.error(
        "Looks like this is not a valid CSV file. Please make sure to save your file as a CSV",
      );
    }
  };

  public render() {
    return (
      <>
        {this.state.participantsStore.state === "error" && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Unable to upload participants. Please contact support
          </Alert>
        )}
        <AllParticipants participantsStore={this.state.participantsStore} eventStore={this.state.eventStore} />
        <CSVReader
          onDrop={this.handleOnDrop}
          style={{}}
          config={{
            header: false,
            error: (e: any) => {
              console.error("Unable to open file", e);
            },
          }}
          addRemoveButton
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
        {this.fileUploadStore.state.kind === "error" && <FileUploadError store={this.fileUploadStore} />}
        <Example />
      </>
    );
  }
}
