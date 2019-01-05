import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
import CardHeading from ".";

describe("<CardHeading />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(<CardHeading>Heading Default</CardHeading>);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("can render a different heading type", () => {
    const tree = renderer.create(
      <CardHeading headingType="h1">Heading 1</CardHeading>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
