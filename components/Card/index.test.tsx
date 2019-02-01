import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { fireEvent } from "react-testing-library";
import { CardContent, CardHeader, CardLink, CardWrapper } from ".";
import { renderWithRouter } from "../../helpers/testUtils";

describe("Card components", () => {
  it("renders children correctly", () => {
    const { queryByText } = renderWithRouter(
      <CardLink to="/team/edit/1/">
        <CardWrapper>
          <CardHeader types={["ELECTRIC", "PSYCHIC"]}>Heading</CardHeader>
          <CardContent>Content</CardContent>
        </CardWrapper>
      </CardLink>
    );

    expect(queryByText(/Heading/)).toBeTruthy();
    expect(queryByText(/Content/)).toBeTruthy();
  });

  describe("when clicking CardLink", () => {
    it("directs user to correct location", () => {
      const { history, getByTestId } = renderWithRouter(
        <CardLink data-testid="card-link" to="/team/edit/1/">
          <CardWrapper>
            <CardHeader types={["ELECTRIC", "PSYCHIC"]}>Heading</CardHeader>
            <CardContent>Content</CardContent>
          </CardWrapper>
        </CardLink>
      );

      fireEvent.click(getByTestId("card-link"));

      expect(
        history.entries.find(entry => entry.pathname === "/team/edit/1/")
      ).toBeTruthy();
    });
  });
});
