import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import PokemonLine from ".";

describe("<PokemonLine />", () => {
  it("renders pokemon name and types", () => {
    const { queryByText } = render(
      <PokemonLine
        pokemon={{
          id: "25",
          name: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: [{ name: "ELECTRIC" }]
        }}
      />
    );

    expect(queryByText(/#25 Pikachu/)).toBeTruthy();
    expect(queryByText(/Electric/i)).toBeTruthy();
  });

  describe("when outdent is passed", () => {
    it("renders pokemon name and types", () => {
      const { queryByText } = render(
        <PokemonLine
          pokemon={{
            id: "25",
            name: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: [{ name: "ELECTRIC" }]
          }}
          outdent={10}
        />
      );

      expect(queryByText(/#25 Pikachu/)).toBeTruthy();
      expect(queryByText(/Electric/i)).toBeTruthy();
    });
  });

  describe("when a pokemon with more than one type is passed", () => {
    it("renders all types", () => {
      const { queryByText } = render(
        <PokemonLine
          pokemon={{
            id: "25",
            name: "bulbasaur",
            pokedexId: 1,
            sprite: "1.png",
            types: [{ name: "POISON" }, { name: "GRASS" }]
          }}
        />
      );

      expect(queryByText(/Poison/i)).toBeTruthy();
      expect(queryByText(/Grass/i)).toBeTruthy();
    });
  });
});
