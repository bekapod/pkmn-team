import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import Page from ".";

describe("<Page />", () => {
  it("renders regular content", () => {
    const { queryByText } = render(
      <Page title="My Page" loading={false}>
        <div>Test Content</div>
      </Page>
    );

    expect(queryByText(/My Page/)).toBeTruthy();
    expect(queryByText(/Test Content/)).toBeTruthy();
    expect(queryByText(/Loading/)).toBeFalsy();
  });

  it("renders loading icon", () => {
    const { queryByText } = render(
      <Page title="My Page" loading={true}>
        <div>Test Content</div>
      </Page>
    );

    expect(queryByText(/My Page/)).toBeTruthy();
    expect(queryByText(/Loading/)).toBeTruthy();
    expect(queryByText(/Test Content/)).toBeFalsy();
  });

  it("renders error message", () => {
    const { queryByText } = render(
      <Page title="My Page" error={{ message: "Error message." } as any}>
        <div>Test Content</div>
      </Page>
    );

    expect(queryByText(/My Page/)).toBeTruthy();
    expect(queryByText(/Error message\./)).toBeTruthy();
    expect(queryByText(/Loading/)).toBeFalsy();
    expect(queryByText(/Test Content/)).toBeFalsy();
  });
});
