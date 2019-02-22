import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import ShallowRenderer from "react-test-renderer/shallow";
import withScrollToTop from "../withScrollToTop";

describe("withScrollToTop", () => {
  it("returns the wrapped component with its own props and scrollToTop prop", () => {
    const renderer = new ShallowRenderer();
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const TestComponent = (props: any): JSX.Element => (
      <div className="class-name" />
    );
    const ComponentWithScrollToTop = withScrollToTop(TestComponent);

    renderer.render(<ComponentWithScrollToTop prop="blah" />);

    const output = renderer.getRenderOutput();

    expect(output.props).toEqual({
      prop: "blah",
      scrollToTop: expect.any(Function)
    });
  });
});
