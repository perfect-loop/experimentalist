import React from "react";
import { mount } from "enzyme";
import ParticipantsStore from "../../storage/ParticipantsStore";
import UploadErrors from "../UploadErrors";

describe("UploadErrors", () => {
  describe("When there are no errors", () => {
    test("does not show the error alert", () => {
      const wrapper = mount(<UploadErrors errors={[]} />);

      expect(wrapper.text().includes("There was an error uploading the participants below:")).toBe(false);
    });
  });

  describe("When there are errors", () => {
    test("shows the error alert", () => {
      const participantsStore = new ParticipantsStore();

      const errors = [
        {
          errmsg: "email_1_event_1_role_1 dup",
          op: {
            email: "test@yahoo.com",
            anonymousName: "100001",
          },
        },
        {
          errmsg: "anonymousName_1_event_1 dup",
          op: {
            email: "test2@yahoo.com",
            anonymousName: "100001",
          },
        },
      ];
      const wrapper = mount(<UploadErrors errors={errors} store={participantsStore} />);

      expect(wrapper.text().includes("There was an error uploading the participants below:")).toBe(true);
      expect(wrapper.text().includes("test@yahoo.com")).toBe(true);
      expect(wrapper.text().includes("Duplicate username")).toBe(true);
      expect(wrapper.text().includes("Duplicate label")).toBe(true);
    });
  });
});
