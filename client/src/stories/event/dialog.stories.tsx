import React from "react";
import CustomizedDialogs from "../../components/VideoConference/CustomizedDialogs";
import { PartcipantFactory } from "../../test/factories/ParticipantFactory";

export default {
  title: "Events/Dialog",
};

export const FloatingButton = () => {
  const participant = PartcipantFactory();
  return (
    <div>
      <CustomizedDialogs participant={participant} />
    </div>
  );
};
