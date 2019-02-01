import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import Heading from ".";

describe("<Heading />", () => {
  it("renders an h1 with children", () => {
    const { getByText } = render(<Heading>This is a heading</Heading>);

    expect(getByText(/This is a heading/).tagName).toBe("H1");
  });
});
