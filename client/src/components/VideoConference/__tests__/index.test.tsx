import React from "react";
import { shallow } from "enzyme";
import VideoConference from "..";
import { Role } from "api/Zoom";
import { Auth0User } from "../../../util/react-auth0-spa";
import { Auth0UserFactory } from "../../../test/factories/Auth0UserFactory";

jest.mock("../ObserverVideoConference", () => () => "ObserverVideoConference");

describe("Events", () => {
  test("Show events", () => {
    const user: Auth0User = Auth0UserFactory();
    const wrapper = shallow(<VideoConference role={Role.Host} eventId="sadfdf" user={user} />);
    const instance = wrapper.instance();
  });
});
