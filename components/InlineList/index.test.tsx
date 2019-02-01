import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import InlineList from ".";

describe("<InlineList />", () => {
  it("renders children", () => {
    const { queryByText } = render(
      <InlineList>
        <li>Item 1</li>
        <li>Item 2</li>
      </InlineList>
    );

    expect(queryByText(/Item 1/)).toBeTruthy();
    expect(queryByText(/Item 2/)).toBeTruthy();
  });
});
