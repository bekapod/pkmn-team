import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
import LoadingIcon from ".";

describe("<LoadingIcon />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(<LoadingIcon />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
