import React from "react";
import renderer from "react-test-renderer";
import CardMeta from ".";

describe("<CardMeta />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(
      <CardMeta
        id="1"
        items={[
          { label: "Item 1", value: "Value 1" },
          { label: "Item 2", value: 2 }
        ]}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
