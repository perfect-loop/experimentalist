import React from "react";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { ZoomMtg } from "@zoomus/websdk";
import { IAttendee, IZoomResult } from "../../types";

const handleClick = () => {
  ZoomMtg.getAttendeeslist({
    success: function(res: IZoomResult) {
      console.log("get getAttendeeslist");
      const participants = res.result!!.attendeesList.filter(p => p.isHold);
      admitNextParticipant(participants);
    },
  });
};

const admitNextParticipant = async (attendees: IAttendee[]) => {
  var user = attendees.pop();
  if (user === undefined) {
    return;
  }
  ZoomMtg.putOnHold({
    userId: user.userId,
    hold: false, // take user out of waiting room
    success: async function(res: any) {
      console.log(`Success is `, res);
      await new Promise(r => setTimeout(r, 5000));
      admitNextParticipant(attendees);
    },
    error: async function(res: any) {
      console.log(`Error is `, res);
      await new Promise(r => setTimeout(r, 5000));
      admitNextParticipant(attendees);
    },
  });
};

export default function AdmitAll() {
  return (
    <div>
      <GroupAddIcon onClick={handleClick} />
    </div>
  );
}
