import React from "react";
import { render } from "react-testing-library";
import FullBleedContainer from ".";

describe("<FullBleedContainer />", () => {
  it("renders children", () => {
    const { queryByText } = render(
      <FullBleedContainer>A section of content</FullBleedContainer>
    );

    expect(queryByText(/A section of content/)).toBeTruthy();
  });
});
