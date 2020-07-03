import { Component } from "react";
import React from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle/AlertTitle";

interface IProps {
  eventId: string;
}

export default class Unavailable extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          We have already started the experiment and unfortunately you won’t be able to participate. Please connect on
          time the next time you sign up!
        </Alert>
      </div>
    );
  }
}
