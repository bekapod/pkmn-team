import React from "react";
import { render } from "react-testing-library";
import GiantInput from ".";

describe("<GiantInput />", (): void => {
  it("renders with correct name, type & label", (): void => {
    const { getByLabelText } = render(
      <GiantInput aria-label="Test input" name="test-input" type="text" />
    );

    const input = getByLabelText(/Test input/);

    expect(input.getAttribute("type")).toBe("text");
    expect(input.getAttribute("name")).toBe("test-input");
  });
});
