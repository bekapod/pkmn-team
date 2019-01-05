import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
import PokemonGrid from ".";

describe("<PokemonGrid />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(
      <PokemonGrid>
        <div>Pokemon 1</div>
        <div>Pokemon 2</div>
      </PokemonGrid>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
