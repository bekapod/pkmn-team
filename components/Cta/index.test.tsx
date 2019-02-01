import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { fireEvent, render } from "react-testing-library";
import { CtaButton, CtaInternalLink } from ".";
import { renderWithRouter } from "../../helpers/testUtils";

describe("<CtaInternalLink />", () => {
  it("renders a link", () => {
    const { getByText } = renderWithRouter(
      <CtaInternalLink to="/dashboard">Dashboard</CtaInternalLink>
    );

    expect(getByText(/Dashboard/).tagName).toBe("A");
  });

  describe("when user has clicked the link", () => {
    it("directs user to correct page", () => {
      const { getByText, history } = renderWithRouter(
        <CtaInternalLink to="/dashboard">Dashboard</CtaInternalLink>
      );

      expect(
        history.entries.find(entry => entry.pathname === "/dashboard")
      ).toBeFalsy();

      fireEvent.click(getByText(/Dashboard/));

      expect(
        history.entries.find(entry => entry.pathname === "/dashboard")
      ).toBeTruthy();
    });
  });

  describe("when secondary prop is passed", () => {
    it("renders a link", () => {
      const { getByText } = renderWithRouter(
        <CtaInternalLink to="/dashboard" secondary={true}>
          Dashboard
        </CtaInternalLink>
      );

      expect(getByText(/Dashboard/).tagName).toBe("A");
    });
  });

  describe("when small prop is passed", () => {
    it("renders a link", () => {
      const { getByText } = renderWithRouter(
        <CtaInternalLink to="/dashboard" small={true}>
          Dashboard
        </CtaInternalLink>
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
