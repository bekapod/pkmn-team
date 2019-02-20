import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { fireEvent, render } from "react-testing-library";
import { CtaButton, CtaInternalLink } from ".";

describe("<CtaInternalLink />", () => {
  it("renders a link", () => {
    const { getByText } = render(<CtaInternalLink>Dashboard</CtaInternalLink>);

    expect(getByText(/Dashboard/).tagName).toBe("A");
  });

  describe("when secondary prop is passed", () => {
    it("renders a link", () => {
      const { getByText } = render(
        <CtaInternalLink secondary={true}>Dashboard</CtaInternalLink>
      );

      expect(getByText(/Dashboard/).tagName).toBe("A");
    });
  });

  describe("when small prop is passed", () => {
    it("renders a link", () => {
      const { getByText } = render(
        <CtaInternalLink small={true}>Dashboard</CtaInternalLink>
      );

      expect(getByText(/Dashboard/).tagName).toBe("A");
    });
  });
});

describe("<CtaButton />", () => {
  it("renders a button", () => {
    const onClick = () => null;
    const { getByText } = render(
      <CtaButton onClick={onClick}>Create Team</CtaButton>
    );

    expect(getByText(/Create Team/).tagName).toBe("BUTTON");
  });

  it("calls onClick", () => {
    const spy = jest.fn();
    const { getByText } = render(
      <CtaButton onClick={spy}>Create Team</CtaButton>
    );

    expect(spy).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText(/Create Team/));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe("when secondary prop is passed", () => {
    it("renders a button", () => {
      const onClick = () => null;
      const { getByText } = render(
        <CtaButton secondary={true} onClick={onClick}>
          Create Team
        </CtaButton>
      );

      expect(getByText(/Create Team/).tagName).toBe("BUTTON");
    });
  });

  describe("when small prop is passed", () => {
    it("renders a button", () => {
      const onClick = () => null;
      const { getByText } = render(
        <CtaButton small={true} onClick={onClick}>
          Create Team
        </CtaButton>
      );

      expect(getByText(/Create Team/).tagName).toBe("BUTTON");
    });
  });
});
