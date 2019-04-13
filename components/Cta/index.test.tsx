import React from "react";
import { fireEvent, render } from "react-testing-library";
import { CtaButton, CtaInternalLink } from ".";

describe("<CtaInternalLink />", (): void => {
  it("renders a link", (): void => {
    const { getByText } = render(<CtaInternalLink>Dashboard</CtaInternalLink>);

    expect(getByText(/Dashboard/).tagName).toBe("A");
  });

  describe("when secondary prop is passed", (): void => {
    it("renders a link", (): void => {
      const { getByText } = render(
        <CtaInternalLink secondary>Dashboard</CtaInternalLink>
      );

      expect(getByText(/Dashboard/).tagName).toBe("A");
    });
  });

  describe("when small prop is passed", (): void => {
    it("renders a link", (): void => {
      const { getByText } = render(
        <CtaInternalLink small>Dashboard</CtaInternalLink>
      );

      expect(getByText(/Dashboard/).tagName).toBe("A");
    });
  });
});

describe("<CtaButton />", (): void => {
  it("renders a button", (): void => {
    const onClick = (): null => null;
    const { getByText } = render(
      <CtaButton onClick={onClick}>Create Team</CtaButton>
    );

    expect(getByText(/Create Team/).tagName).toBe("BUTTON");
  });

  it("calls onClick", (): void => {
    const spy = jest.fn();
    const { getByText } = render(
      <CtaButton onClick={spy}>Create Team</CtaButton>
    );

    expect(spy).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText(/Create Team/));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe("when secondary prop is passed", (): void => {
    it("renders a button", (): void => {
      const onClick = (): null => null;
      const { getByText } = render(
        <CtaButton secondary onClick={onClick}>
          Create Team
        </CtaButton>
      );

      expect(getByText(/Create Team/).tagName).toBe("BUTTON");
    });
  });

  describe("when small prop is passed", (): void => {
    it("renders a button", (): void => {
      const onClick = (): null => null;
      const { getByText } = render(
        <CtaButton small onClick={onClick}>
          Create Team
        </CtaButton>
      );

      expect(getByText(/Create Team/).tagName).toBe("BUTTON");
    });
  });
});
