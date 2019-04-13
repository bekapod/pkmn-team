import React from "react";
import { render } from "react-testing-library";
import Heading from ".";

describe("<Heading />", (): void => {
  it("renders an h1 with children", (): void => {
    const { getByText } = render(<Heading>This is a heading</Heading>);

    expect(getByText(/This is a heading/).tagName).toBe("H1");
  });
});
