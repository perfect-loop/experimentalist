import { Component } from "react";
import React from "react";
import AllEvents from "./AllEvents";
import { observer } from "mobx-react";
import NewPopup from "../Create/NewPopup";
import ParticipantsStore from "../../VideoConference/store/ParticipantsStore";
import { Alert, AlertTitle } from "@material-ui/lab";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Button, Divider } from "@material-ui/core";
import history from "../../../util/history";
import { Link } from "react-router-dom";

interface IState {
  participationsStore: ParticipantsStore;
}

interface IProps {
  createDialogOpen: boolean;
}

@observer
export default class EventsIndex extends Component<IProps, IState> {
  constructor(props: IProps) {
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
              <Link to="/events/new">
                <Button color="primary" variant="contained">
                  <AddCircleOutlineIcon />
                  New Event
                  </Button>
              </Link>
              <NewPopup defaultOpen={this.props.createDialogOpen} />
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
