import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
import TextInput from "./";

describe("<TextInput />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(
      <TextInput type="text" placeholder="Text Input" />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders without crashing when invalid", () => {
    const tree = renderer.create(
      <TextInput type="text" placeholder="Text Input" isInvalid={true} />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
