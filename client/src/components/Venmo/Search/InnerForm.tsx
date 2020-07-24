import React from "react";
import VenmoSearchStorage from "./storage/VenmoSearchStorage";
import { CircularProgress } from "@material-ui/core";
import SearchCard from "./SearchCard";
import SearchForm from "./SearchForm";
import { observer } from "mobx-react";
import { User } from "./User";
import { Success } from "./Success";
import { Error } from "../Error";
import { NotFound } from "./NotFound";

const InnerForm = (props: {
  storage: VenmoSearchStorage;
  setVenmoHandle: (venmoHandle: string, venmoId: string) => void;
}): JSX.Element => {
  switch (props.storage.state.kind) {
    case "not_ready": {
      return (
        <SearchCard>
          <SearchForm venmoStorage={props.storage} />
        </SearchCard>
      );
    }
    case "searching": {
      return (
        <SearchCard>
          <div>Searching User</div>
          <CircularProgress />
        </SearchCard>
      );
    }
    case "user_found": {
      return (
        <SearchCard>
          <User user={props.storage.state.user} venmoStorage={props.storage} setVenmoHandle={props.setVenmoHandle} />
        </SearchCard>
      );
    }
    case "done": {
      return (
        <SearchCard>
          <Success />
        </SearchCard>
      );
    }
    case "error": {
      return (
        <SearchCard>
          <Error />
        </SearchCard>
      );
    }
    case "not_found": {
      return (
        <SearchCard>
          <NotFound venmoStorage={props.storage} />
        </SearchCard>
      );
    }
  }
};

export default observer(InnerForm);
