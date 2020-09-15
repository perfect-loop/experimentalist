import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter, Link, Redirect } from "react-router-dom";
import ImageUpload from "..";
import ImageUploadStore from "../store/ImageUploadStore";
import Instructions from "../Instructions";

describe("ImageUpload", () => {
  const participationId = "partid";
  const store = new ImageUploadStore(participationId);
  test("Show instructions when process not yet started", () => {
    store.state = {
      kind: "not_started",
    };
    const wrapper = shallow(<ImageUpload eventId="asdsf" participationId={participationId} imageUploadStore={store} />);

    expect(wrapper.find(Instructions)).toHaveLength(1);
  });
  test("Show instructions while uploading", () => {
    store.state = {
      kind: "uploading",
    };
    const wrapper = shallow(<ImageUpload eventId="asdsf" participationId={participationId} imageUploadStore={store} />);

    expect(wrapper.find(Instructions)).toHaveLength(1);
  });
  test("Redirect to next page after done", () => {
    store.state = {
      kind: "finish",
      verificationImageUrl: "someurl",
    };
    const wrapper = shallow(<ImageUpload eventId="asdsf" participationId={participationId} imageUploadStore={store} />);

    const redirect = wrapper.find(Redirect);
    expect(redirect).toHaveLength(1);
    expect(redirect.prop("to")).toBe("/events/asdsf/payment/");
  });
});
