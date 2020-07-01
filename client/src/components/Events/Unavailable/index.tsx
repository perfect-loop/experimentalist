import EventStore from "../storage/EventStore";
import { Component } from "react";
import React from "react";
import { observer } from "mobx-react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle/AlertTitle";

interface IState {
  eventStore: EventStore;
}

interface IProps {
  eventId: string;
}

@observer
export default class Unavailable extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const eventStore = new EventStore();
    this.state = {
      eventStore,
    };
    eventStore.get(props.eventId);
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
