import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
import CenteredRow from ".";

describe("<CenteredRow />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(
      <CenteredRow>
        <span>Child 1</span>
        <span>Child 2</span>
      </CenteredRow>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders without crashing when stackVertically is passed", () => {
    const tree = renderer.create(
      <CenteredRow stackVertically={true}>
        <span>Child 1</span>
        <span>Child 2</span>
      </CenteredRow>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
