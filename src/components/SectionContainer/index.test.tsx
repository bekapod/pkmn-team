import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import SectionContainer from ".";

describe("<SectionContainer />", () => {
  it("renders children", () => {
    const { queryByText } = render(
      <SectionContainer>A section of content</SectionContainer>
    );

    expect(queryByText(/A section of content/)).toBeTruthy();
  });
});
