import React from "react";
import { MemoryRouter } from "react-router-dom";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
// tslint:disable-next-line:no-implicit-dependencies
import { cleanup, fireEvent, render } from "react-testing-library";
import { CtaButton, CtaInternalLink } from ".";

describe("<CtaInternalLink />", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders without crashing", () => {
    const tree = renderer.create(
      <MemoryRouter initialEntries={["/"]}>
        <CtaInternalLink to="/dashboard">Dashboard</CtaInternalLink>
      </MemoryRouter>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe("when secondary prop is passed", () => {
    it("renders without crashing", () => {
      const tree = renderer.create(
        <MemoryRouter initialEntries={["/"]}>
          <CtaInternalLink to="/dashboard" secondary={true}>
            Dashboard
          </CtaInternalLink>
        </MemoryRouter>
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("when small prop is passed", () => {
    it("renders without crashing", () => {
      const tree = renderer.create(
        <MemoryRouter initialEntries={["/"]}>
          <CtaInternalLink to="/dashboard" small={true}>
            Dashboard
          </CtaInternalLink>
        </MemoryRouter>
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});

describe("<CtaButton />", () => {
  it("renders without crashing", () => {
    const onClick = () => null;
    const tree = renderer.create(
      <CtaButton onClick={onClick}>Create Team</CtaButton>
    );

    expect(tree.toJSON()).toMatchSnapshot();
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
    it("renders without crashing", () => {
      const onClick = () => null;
      const tree = renderer.create(
        <CtaButton secondary={true} onClick={onClick}>
          Create Team
        </CtaButton>
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("when small prop is passed", () => {
    it("renders without crashing", () => {
      const onClick = () => null;
      const tree = renderer.create(
        <CtaButton small={true} onClick={onClick}>
          Create Team
        </CtaButton>
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
