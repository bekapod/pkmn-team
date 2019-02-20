import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import Page from ".";

describe("<Page />", () => {
  it("renders regular content", () => {
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
