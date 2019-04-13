import React from "react";
import { render } from "react-testing-library";
import CenteredRow from ".";

describe("<CenteredRow />", (): void => {
  it("renders all children", (): void => {
    const { queryByText } = render(
      <CenteredRow>
        <span>Child 1</span>
        <span>Child 2</span>
      </CenteredRow>
    );

    expect(queryByText(/Child 1/)).toBeTruthy();
    expect(queryByText(/Child 2/)).toBeTruthy();
  });

  describe("with stackVertically prop", (): void => {
    it("renders all children", (): void => {
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
