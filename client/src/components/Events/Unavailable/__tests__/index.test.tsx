import React from "react";
import { render } from "@testing-library/react";
import Unavailable from "../index";

test("Renders text", () => {
  const { getByText } = render(<Unavailable eventId={"hk1234jf"} />);
  const linkElement = getByText(/We have already started the experiment/i);
  expect(linkElement).toBeInTheDocument();
});
