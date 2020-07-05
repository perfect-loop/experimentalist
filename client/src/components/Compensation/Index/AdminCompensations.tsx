import React, { Component } from "react";
import { observer } from "mobx-react";
import CompensationsStore, { IRawUploadedData } from "../storage/CompensationsStore";
import { ICompensation } from "api/Compensations";
import { IProfile } from "api/Profiles";
import { CSVReader } from "react-papaparse";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle/AlertTitle";
import CompensationsTable from "./CompensationTable";

interface IProps {
  eventId: string;
}

interface IState {
  compensationsStore: CompensationsStore;
}

export interface IUserCompensation {
  profile: IProfile;
  compensation: ICompensation;
  email: string;
}

@observer
class AdminCompensation extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const compensationsStore = new CompensationsStore(props.eventId);
    this.state = {
      compensationsStore: compensationsStore,
    };
    compensationsStore.getAdmin();
  }

  private handleOnDrop = (data: IRawUploadedData[]) => {
    // remove header elements
    data.shift();
    this.state.compensationsStore.uploadCSVData(data, this.props.eventId);
  };

  public render() {
    const {state} = this.state.compensationsStore;
    if (state.kind === "error") {
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Unable to load compensation. Please make sure there are no duplicate entries
        </Alert>
      );
    } else if (state.kind === "ready") {
      return (
        <>
          <CompensationsTable compensations={state.model} />
          <CSVReader
            onDrop={this.handleOnDrop}
            style={{}}
            config={{
              header: false,
              error: (e: any) => {
                console.error("Unable to open file", e);
              },
            }}
          >
            <span>Drop CSV file here or click to upload.</span>
          </CSVReader>
        </>
      );
    } else {
      return <>Loading</>;
    }
  }
}

export default AdminCompensation;
