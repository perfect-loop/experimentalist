import React from "react";
import CustomizedDialogs from "../components/VideoConference/CustomizedDialogs";
import { IParticipation } from "api/Participations";

export default {
  title: "Dialog",
};

const participant: IParticipation = {
  _id: "",
  email: "",
  event: {
    _id: "",
    title: "Super title",
    instructions: "{\"blocks\":[{\"key\":\"dosve\",\"text\":\"how about this simple link\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":22,\"length\":4,\"key\":0}],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"http://google.com\",\"className\":\"MUIRichTextEditor-anchorLink-12\"}}}}",
    startAt: new Date(),
    endAt: "",
    active: true,
    state: "active"
  },
  anonymousName: "booblik",
  role: "attendee",
  instructions: ""
}

export const FloatingButton = () => {
  return (
    <div>
      <CustomizedDialogs participant={participant}/>
    </div>
  );
};
