import React from "react";
import ProfileStore from "../storage/ProfileStore";
import { IProfile } from "models/Profiles";
import { Api } from "models/Socket";
import ProfileForm from "../ProfileForm";
import { Typography } from "@material-ui/core";

function NewProfile() {
  const onSubmit = (values: any): Promise<IProfile> => {
    const newProfile = values as IProfile;
    const profileStore = new ProfileStore();

    return new Promise((resolve, reject) => {
      profileStore
        .post(newProfile)
        .then((profile: IProfile) => {
          resolve(profile);
        })
        .catch((error: Api.Error) => {
          reject(error);
        });
    });
  };
  return (
    <>
      <Typography variant="h6">Fill in your profile</Typography>
      <ProfileForm onSubmit={onSubmit} afterSuccessPath={"/events"} />
    </>
  );
}

export default NewProfile;
