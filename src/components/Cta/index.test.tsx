import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import { CtaInternalLink, CtaButton } from ".";

describe("<CtaInternalLink />", () => {
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
          <CtaInternalLink to="/dashboard" secondary>
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
          <CtaInternalLink to="/dashboard" small>
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
    const tree = renderer.create(
      <CtaButton onClick={() => {}}>Create Team</CtaButton>
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
      const tree = renderer.create(
        <CtaButton secondary onClick={() => {}}>
          Create Team
        </CtaButton>
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("when small prop is passed", () => {
    it("renders without crashing", () => {
      const tree = renderer.create(
        <CtaButton small onClick={() => {}}>
          Create Team
        </CtaButton>
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
