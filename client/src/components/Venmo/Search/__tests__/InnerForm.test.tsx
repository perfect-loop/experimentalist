import React from "react";
import { shallow, mount } from "enzyme";
import InnerForm from "../InnerForm";
import VenmoSearchStorage from "../storage/VenmoSearchStorage";

describe("VenmoSeach Inner Form", () => {
  describe("Mulltiple attempts", () => {
    const storage = new VenmoSearchStorage();
    const setVenmoHandle = (venmoHandle: string, venmoId: string) => "";
    storage.state = {
      kind: "not_found",
    };

    it("Too many failed attempts", () => {
      storage.failedAttempt = 4;
      storage.state = {
        kind: "not_found",
      };
      const wrapper = shallow(<InnerForm storage={storage} setVenmoHandle={setVenmoHandle} />);
      expect(wrapper.html()).toContain("I really don&#x27;t know");
    });

    it("Not too many failed attempts", () => {
      storage.failedAttempt = 1;
      const wrapper = shallow(<InnerForm storage={storage} setVenmoHandle={setVenmoHandle} />);
      expect(wrapper.html()).not.toContain("I really don&#x27;t know");
    });
  });
});
