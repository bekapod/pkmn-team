import React from "react";
import { render } from "react-testing-library";
import Page from ".";

describe("<Page />", (): void => {
  it("renders regular content", (): void => {
    const { queryByText } = render(
      <Page title="My Page">
        <div>Test Content</div>
      </Page>
    );

    expect(queryByText(/My Page/)).toBeTruthy();
    expect(queryByText(/Test Content/)).toBeTruthy();
    expect(queryByText(/Loading/)).toBeFalsy();
  });
});
