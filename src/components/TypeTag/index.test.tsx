import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
import TypeTag from "./";

describe("<TypeTag />", () => {
  it("renders without crashing with ELECTRIC type", () => {
    const tree = renderer.create(<TypeTag type="ELECTRIC">ELECTRIC</TypeTag>);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders without crashing with PSYCHIC type", () => {
    const tree = renderer.create(<TypeTag type="PSYCHIC">PSYCHIC</TypeTag>);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
