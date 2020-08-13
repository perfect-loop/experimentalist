import React, { Component } from "react";
import { observer } from "mobx-react";
import CompensationsStore, { IRawUploadedData } from "../storage/CompensationsStore";
import FileUploadStore from "../../FileUpload/store/FileUploadStore";
import { FileData, isCSVFile } from "../../FileUpload/store/Types";
import { IUserCompensation } from "api/Compensations";
import { CSVReader } from "react-papaparse";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle/AlertTitle";
import CompensationsTable from "./CompensationTable";
import VenmoLoginPopup from "./VenmoLogin";
import { CircularProgress } from "@material-ui/core";
import Example from "./Example";
import FileUploadError from "../../FileUpload/FileUploadError";

interface IProps {
  eventId: string;
}

interface IState {
  compensationsStore: CompensationsStore;
}

@observer
class AdminCompensation extends Component<IProps, IState> {
  fileUploadStore = new FileUploadStore();
  constructor(props: IProps) {
    super(props);
    const compensationsStore = new CompensationsStore(props.eventId);

    this.state = {
      compensationsStore: compensationsStore,
    };
    compensationsStore.getAdmin();
  }

  private pay = (compensation: IUserCompensation) => {
    const data = {
      venmoId: compensation.profile.venmoId.split(/www.venmo.com\//)[1],
      amount: compensation.compensation.amount,
      event: this.props.eventId,
      compensationId: compensation.compensation._id,
    };
    this.state.compensationsStore.pay(data);
  };

  private handleOnDrop = (data: IRawUploadedData[], file: FileData) => {
    this.fileUploadStore.notStarted();
    if (isCSVFile(file.name)) {
      // remove header elements
      data.shift();
      this.state.compensationsStore.uploadCSVData(data, this.props.eventId);
    } else {
      this.fileUploadStore.error(
        "Looks like this is not a valid CSV file. Please make sure to save your file as a CSV",
      );
    }
  };

  public render() {
    const { state, compensations } = this.state.compensationsStore;

    if (state === "error") {
      const { error } = this.state.compensationsStore;
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      );
    } else if (state === "ready") {
      return (
        <>
          <VenmoLoginPopup />
          <CompensationsTable compensations={compensations} pay={this.pay} />
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
    } else if (state === "paying") {
      return <CircularProgress />;
    } else {
      return <CircularProgress />;
    }
  }
}

export default AdminCompensation;
