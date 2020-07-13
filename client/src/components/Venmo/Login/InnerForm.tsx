import React from "react";
import VenmoStorage from "./storage/VenmoStorage";
import { CircularProgress } from "@material-ui/core";
import LoginForm from "./LoginForm";
import { observer } from "mobx-react";
import MFAForm from "./MFAForm";
import LoginCard from "./LoginCard";
import { Success } from "./Success";
import { Error } from "./Error";

const InnerForm = (props: { storage: VenmoStorage }) => {
  switch (props.storage.state.kind) {
    case "not_started": {
      return (
        <LoginCard>
          <LoginForm venmoStorage={props.storage} />
        </LoginCard>
      );
    }
    case "logging_in": {
      return (
        <LoginCard>
          <div>Logging in to Venmo</div>
          <CircularProgress />
        </LoginCard>
      );
    }
    case "2fa_requested": {
      return (
        <LoginCard>
          <MFAForm venmoStorage={props.storage} />
        </LoginCard>
      );
    }
    case "done": {
      return (
        <LoginCard>
          <Success />
        </LoginCard>
      );
    }
    case "error": {
      return (
        <LoginCard>
          <Error />
        </LoginCard>
      );
    }
    default: {
      return <></>;
    }
  }
};

export default observer(InnerForm);
