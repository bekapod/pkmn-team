import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import ErrorMessage from ".";

describe("<ErrorMessage />", () => {
  describe("when text is passed", () => {
    it("renders child as string", () => {
      const { getByText } = render(
        <ErrorMessage>This is an error</ErrorMessage>
      );

      expect(getByText(/This is an error/).getAttribute("role")).toBe("alert");
    });
  });

  describe("when a html element is passed", () => {
    it("renders the html element", () => {
      const { getByText } = render(
        <ErrorMessage>
          <span>This is an error in a span</span>
        </ErrorMessage>
      );

      expect(getByText(/This is an error in a span/).tagName).toBe("SPAN");
    });
  });

  describe("when a react component is passed", () => {
    it("renders as per component", () => {
      const Component = () => <div>This is an error in a component</div>;
      const { getByText } = render(
        <ErrorMessage>
          <Component />
        </ErrorMessage>
      );

      expect(getByText(/This is an error in a component/).tagName).toBe("DIV");
    });
  });

  describe("when isBig prop is passed", () => {
    it("renders child as a string", () => {
      const { queryByText } = render(
        <ErrorMessage isBig={true}>This is an error</ErrorMessage>
      );

      expect(queryByText(/This is an error/)).toBeTruthy();
    });
  });
});
