import React from "react";
import { render } from "react-testing-library";
import ErrorMessage from ".";

describe("<ErrorMessage />", (): void => {
  describe("when text is passed", (): void => {
    it("renders child as string", (): void => {
      const { getByText } = render(
        <ErrorMessage>This is an error</ErrorMessage>
      );

      expect(getByText(/This is an error/).getAttribute("role")).toBe("alert");
    });
  });

  describe("when a html element is passed", (): void => {
    it("renders the html element", (): void => {
      const { getByText } = render(
        <ErrorMessage>
          <span>This is an error in a span</span>
        </ErrorMessage>
      );

      expect(getByText(/This is an error in a span/).tagName).toBe("SPAN");
    });
  });

  describe("when a react component is passed", (): void => {
    it("renders as per component", (): void => {
      const Component = (): JSX.Element => (
        <div>This is an error in a component</div>
      );
      const { getByText } = render(
        <ErrorMessage>
          <Component />
        </ErrorMessage>
      );

      expect(getByText(/This is an error in a component/).tagName).toBe("DIV");
    });
  });

  describe("when isBig prop is passed", (): void => {
    it("renders child as a string", (): void => {
      const { queryByText } = render(
        <ErrorMessage isBig>This is an error</ErrorMessage>
      );

      expect(queryByText(/This is an error/)).toBeTruthy();
    });
  });
});
