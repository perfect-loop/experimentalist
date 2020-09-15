import React, { Component } from "react";
import { observer } from "mobx-react";
import CompensationsStore from "../storage/CompensationsStore";
import { IRawUploadedData } from "../storage/helpers";
import FileUploadStore from "../../FileUpload/store/FileUploadStore";
import { FileData, isCSVFile } from "../../FileUpload/store/Types";
import { IUserCompensation } from "models/Compensations";
import { CSVReader } from "react-papaparse";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle/AlertTitle";
import VenmoLoginPopup from "./VenmoLogin";
import { CircularProgress } from "@material-ui/core";
import Example from "./Example";
import FileUploadError from "../../FileUpload/FileUploadError";
import CompensationsTable from "./CompensationTable";
import PayPalCompensationsTable from "./PayPalCompensationTable";
import UploadErrors from "./UploadErrors";

interface IProps {
  eventId: string;
  method: "venmo" | "paypal";
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
      venmoId: compensation.profile.venmoId,
      amount: compensation.compensation.amount,
      event: this.props.eventId,
      compensationId: compensation.compensation._id,
      paymentMethod: "venmo",
    };
    this.state.compensationsStore.pay(data);
  };

  private handleOnDrop = (data: IRawUploadedData[], file: FileData) => {
    this.fileUploadStore.notStarted();
    if (isCSVFile(file.name)) {
      // remove header elements
      data.shift();

      this.validateData(data);
    } else {
      this.fileUploadStore.error(
        "Looks like this is not a valid CSV file. Please make sure to save your file as a CSV",
      );
    }
  };

  private validateData = (data: IRawUploadedData[]) => {
    const validatedData = this.state.compensationsStore.validateData(data, this.props.method);

    const uploadWithErrors = validatedData.filter(item => !!item.error);
    if (uploadWithErrors.length > 0) {
      this.state.compensationsStore.uploadWithErrors = uploadWithErrors;
    } else {
      this.state.compensationsStore.uploadCSVData(data, this.props.eventId);
    }
  };

  public render() {
    const { state, compensations, error, uploadWithErrors } = this.state.compensationsStore;

    let errorMsg: JSX.Element = <></>;
    switch (state) {
      case "error": {
        errorMsg = (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        );
      }
      case "paying":
      case "ready": {
        return (
          <>
            {errorMsg}
            <UploadErrors store={this.state.compensationsStore} uploadWithErrors={uploadWithErrors} />
            <br />
            <br />
            {state === "paying" && <CircularProgress />}
            {this.props.method === "venmo" && (
              <>
                <VenmoLoginPopup />
                <CompensationsTable compensations={compensations} pay={this.pay} />
              </>
            )}
            {this.props.method === "paypal" && <PayPalCompensationsTable compensations={compensations} />}
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

            <Example paymentMethod={this.props.method} />
          </>
        );
      }
      case "not_ready": {
        return <CircularProgress />;
      }
    }
  }
}

export default AdminCompensation;
