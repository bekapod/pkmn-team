import React from "react";
import { render } from "react-testing-library";
import PokemonGrid from ".";

describe("<PokemonGrid />", (): void => {
  it("renders children", (): void => {
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
