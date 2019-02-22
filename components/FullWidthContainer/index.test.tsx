import React from "react";
import { render } from "react-testing-library";
import FullWidthContainer from ".";

describe("<FullWidthContainer />", () => {
  it("renders children", () => {
    const { queryByText } = render(
      <FullWidthContainer>A section of content</FullWidthContainer>
    );

    expect(queryByText(/A section of content/)).toBeTruthy();
  });
});
