import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import GiantInput from ".";

describe("<GiantInput />", () => {
  it("renders with correct name, type & label", () => {
    const { getByLabelText } = render(
      <GiantInput aria-label="Test input" name="test-input" type="text" />
    );

    const input = getByLabelText(/Test input/);

    expect(input.getAttribute("type")).toBe("text");
    expect(input.getAttribute("name")).toBe("test-input");
  });
});
