import { Component } from "react";
import React from "react";
import Alert from "@material-ui/lab/Alert";
import ImageUpload from "../../ImageUpload";

interface IProps {
  participationId: string;
  eventId: string;
}

export default class Verify extends Component<IProps, {}> {
  public render() {
    return (
      <div>
        <Alert severity="info" icon={false}>
          <ImageUpload participationId={this.props.participationId} eventId={this.props.eventId} />
        </Alert>
      </div>
    );
  }
}
