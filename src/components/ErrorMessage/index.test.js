// @flow
import React from "react";
import renderer from "react-test-renderer";
import ErrorMessage from ".";

describe("<ErrorMessage />", () => {
  describe("when text is passed", () => {
    it("renders without crashing", () => {
      const tree = renderer.create(
        <ErrorMessage>This is an error</ErrorMessage>
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("when a html element is passed", () => {
    const tree = renderer.create(
      <ErrorMessage>
        <span>This is an error in a span</span>
      </ErrorMessage>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe("when a react component is passed", () => {
    const Component = () => <div>This is an error in a component</div>;
    const tree = renderer.create(
      <ErrorMessage>
        <Component />
      </ErrorMessage>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
