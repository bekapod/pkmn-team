import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import PokemonGrid from ".";

describe("<PokemonGrid />", () => {
  it("renders children", () => {
    const { queryByText } = render(
      <PokemonGrid>
        <div>Pokemon 1</div>
        <div>Pokemon 2</div>
      </PokemonGrid>
    );

    expect(queryByText(/Pokemon 1/)).toBeTruthy();
    expect(queryByText(/Pokemon 2/)).toBeTruthy();
  });
});
