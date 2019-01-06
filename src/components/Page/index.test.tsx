import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
import Page from ".";

describe("<Page />", () => {
  it("renders regular content", () => {
    const tree = renderer.create(
      <Page title="My Page" loading={false}>
        <div>Test Content</div>
      </Page>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders loading icon", () => {
    const tree = renderer.create(
      <Page title="My Page" loading={true}>
        <div>Test Content</div>
      </Page>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders error message", () => {
    const tree = renderer.create(
      <Page
        title="My Page"
        loading={false}
        error={{ message: "Error message." } as any}
      >
        <div>Test Content</div>
      </Page>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
