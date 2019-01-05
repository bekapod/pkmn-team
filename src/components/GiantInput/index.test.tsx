import React from "react";
import renderer from "react-test-renderer";
import GiantInput from ".";

describe("<GiantInput />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(<GiantInput type="text" />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
