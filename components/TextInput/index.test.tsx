import React from "react";
import { render } from "react-testing-library";
import TextInput from ".";

describe("<TextInput />", (): void => {
  it("renders with correct attributes", (): void => {
    const { getByPlaceholderText } = render(
      <TextInput type="text" placeholder="Text Input" />
    );

    expect(getByPlaceholderText(/Text Input/).getAttribute("type")).toBe(
      "text"
    );
  });

  it("renders with correct attributes when invalid", (): void => {
    const { getByPlaceholderText } = render(
      <TextInput type="text" placeholder="Text Input" isInvalid />
    );

    expect(getByPlaceholderText(/Text Input/).getAttribute("type")).toBe(
      "text"
    );
  });
});
