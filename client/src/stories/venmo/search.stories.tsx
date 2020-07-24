import React from "react";
import VenmoSearchStorage from "../../components/Venmo/Search/storage/VenmoSearchStorage";
import InnerForm from "../../components/Venmo/Search/InnerForm";
import { Venmo } from "models/Venmo";

export default {
  title: "Venmo/Venmo Search",
};

export const Initial = () => {
  const storage = new VenmoSearchStorage();
  const setVenmoHandle = (venmoHandle: string, venmoId: string) => "";
  storage.state = {
    kind: "not_ready",
  };
  return (
    <div>
      <InnerForm storage={storage} setVenmoHandle={setVenmoHandle} />
    </div>
  );
};

export const Done = () => {
  const storage = new VenmoSearchStorage();
  const setVenmoHandle = (venmoHandle: string, venmoId: string) => "";
  storage.state = {
    kind: "done",
  };
  return (
    <div>
      <InnerForm storage={storage} setVenmoHandle={setVenmoHandle} />
    </div>
  );
};

export const NotFound = () => {
  const storage = new VenmoSearchStorage();
  const setVenmoHandle = (venmoHandle: string, venmoId: string) => "";
  storage.state = {
    kind: "not_found",
  };
  return (
    <div>
      <InnerForm storage={storage} setVenmoHandle={setVenmoHandle} />
    </div>
  );
};

export const UserFound = () => {
  const storage = new VenmoSearchStorage();
  const setVenmoHandle = (venmoHandle: string, venmoId: string) => "";
  const user: Venmo.IVenmoUser = {
    /* eslint-disable @typescript-eslint/camelcase */
    username: "CherryLam",
    last_name: "Lam",
    profile_picture_url:
      "https://pics.venmo.com/8cd84485-b4da-4e1c-97db-5db47b8f9a04?width=460&height=460&photoVersion=1",
    id: "1556077858521088513",
    date_joined: "2014-11-17T23:28:56",
    about: " ",
    display_name: "Cherry Lam",
    first_name: "Cherry",
    email: undefined,
  };
  storage.state = {
    kind: "user_found",
    user,
  };
  return (
    <div>
      <InnerForm storage={storage} setVenmoHandle={setVenmoHandle} />
    </div>
  );
};
