import React from "react";
import renderer from "react-test-renderer";
import { CardWrapper, CardHeader, CardContent } from ".";

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
