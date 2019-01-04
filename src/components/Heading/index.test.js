// @flow
import React from "react";
import renderer from "react-test-renderer";
import Heading from ".";

describe("<Heading />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(<Heading>This is a heading</Heading>);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
