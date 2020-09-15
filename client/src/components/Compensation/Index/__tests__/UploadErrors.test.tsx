import React from "react";
import { mount } from "enzyme";
import CompensationsStore from "../../storage/CompensationsStore";
import UploadErrors from "../UploadErrors";

describe("UploadErrors", () => {
  describe("When there are no errors", () => {
    it("does not show the error alert", () => {
      const wrapper = mount(<UploadErrors uploadWithErrors={[]} />);

      expect(wrapper.text().includes("There was an error uploading the compensation file. See details below")).toBe(
        false,
      );
    });
  });

  describe.only("When there are errors", () => {
    it("shows the error alert", () => {
      const compensationsStore = new CompensationsStore();

      const errors = [
        {
          data: ["test@yahoo.com", 0.2, "UTD"],
          error: "Currency is not USD",
        },
      ];
      const wrapper = mount(<UploadErrors uploadWithErrors={errors} store={compensationsStore} />);

      expect(wrapper.text().includes("There was an error uploading the compensation file. See details below")).toBe(
        true,
      );
      expect(wrapper.text().includes("test@yahoo.com")).toBe(true);
      expect(wrapper.text().includes("0.2")).toBe(true);
      expect(wrapper.text().includes("Currency is not USD")).toBe(true);
    });
  });
});
