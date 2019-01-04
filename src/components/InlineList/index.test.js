// @flow
import React from "react";
import renderer from "react-test-renderer";
import InlineList from ".";

describe("<InlineList />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(
      <InlineList>
        <li>Item 1</li>
        <li>Item 2</li>
      </InlineList>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
