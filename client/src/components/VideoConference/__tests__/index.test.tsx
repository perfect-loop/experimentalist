import React from "react";
import { shallow } from "enzyme";
import VideoConference from "..";
import { Role } from "models/Zoom";
import { Auth0User } from "../../../util/react-auth0-spa";
import { Auth0UserFactory } from "../../../test/factories/Auth0UserFactory";
import { Api } from "models/Socket";
import { ParticipantFactory } from "../../../test/factories/ParticipantFactory";

jest.mock("../ObserverVideoConference", () => () => "ObserverVideoConference");

describe("Events", () => {
  test("Show events", () => {
    const user: Auth0User = Auth0UserFactory();
    const wrapper = shallow(<VideoConference role={Role.Host} eventId="sadfdf" user={user} />);
    const instance = wrapper.instance();
  });

  test("Joins conference socket room", () => {
    const spyApi = jest.spyOn(Api.Socket, "joinEvent");
    const user: Auth0User = Auth0UserFactory();
    const attendeeParticipation = ParticipantFactory();
    shallow(
      <VideoConference role={Role.Host} eventId="sadfdf" user={user} attendeeParticipation={attendeeParticipation} />,
    );
    const message: Api.Socket.IJoinEventMessage = {
      roomName: Api.Socket.eventSocketIdByEventId("sadfdf"),
      participationId: attendeeParticipation._id,
    };
    expect(spyApi).toBeCalledWith(expect.any(Object), message);
  });
});
