import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
import { CardContent, CardHeader, CardWrapper } from ".";

describe("Card components", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(
      <CardWrapper>
        <CardHeader types={["ELECTRIC", "PSYCHIC"]}>Heading</CardHeader>
        <CardContent>Content</CardContent>
      </CardWrapper>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
