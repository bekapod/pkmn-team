import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import TextInput from "./";

describe("<TextInput />", () => {
  it("renders with correct attributes", () => {
    const { getByPlaceholderText } = render(
      <TextInput type="text" placeholder="Text Input" />
    );

    expect(getByPlaceholderText(/Text Input/).getAttribute("type")).toBe(
      "text"
    );
  });

  it("renders with correct attributes when invalid", () => {
    const { getByPlaceholderText } = render(
      <TextInput type="text" placeholder="Text Input" isInvalid={true} />
    );

    expect(getByPlaceholderText(/Text Input/).getAttribute("type")).toBe(
      "text"
    );
  });
});
