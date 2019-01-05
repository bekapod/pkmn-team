import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
import SectionContainer from ".";

describe("<SectionContainer />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(
      <SectionContainer>A section of content</SectionContainer>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
