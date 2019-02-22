import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import CenteredRow from ".";

describe("<CenteredRow />", () => {
  it("renders all children", () => {
    const { queryByText } = render(
      <CenteredRow>
        <span>Child 1</span>
        <span>Child 2</span>
      </CenteredRow>
    );

    expect(queryByText(/Child 1/)).toBeTruthy();
    expect(queryByText(/Child 2/)).toBeTruthy();
  });

  describe("with stackVertically prop", () => {
    it("renders all children", () => {
      const { queryByText } = render(
        <CenteredRow stackVertically>
          <span>Child 1</span>
          <span>Child 2</span>
        </CenteredRow>
      );

      expect(queryByText(/Child 1/)).toBeTruthy();
      expect(queryByText(/Child 2/)).toBeTruthy();
    });
  });
});
