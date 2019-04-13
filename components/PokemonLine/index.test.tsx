import React from "react";
import { render } from "react-testing-library";
import PokemonLine from ".";

describe("<PokemonLine />", (): void => {
  it("renders pokemon name and types", (): void => {
    const { queryByText } = render(
      <PokemonLine
        pokemon={{
          id: "25",
          name: "Pikachu",
          slug: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: [{ name: "Electric", slug: "electric" }]
        }}
      />
    );

    expect(queryByText(/#25 Pikachu/)).toBeTruthy();
    expect(queryByText(/Electric/i)).toBeTruthy();
  });

  describe("when outdent is passed", (): void => {
    it("renders pokemon name and types", (): void => {
      const { queryByText } = render(
        <PokemonLine
          pokemon={{
            id: "25",
            name: "Pikachu",
            slug: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: [{ name: "Electric", slug: "electric" }]
          }}
          outdent={10}
        />
      );

      expect(queryByText(/#25 Pikachu/)).toBeTruthy();
      expect(queryByText(/Electric/i)).toBeTruthy();
    });
  });

  describe("when a pokemon with more than one type is passed", (): void => {
    it("renders all types", (): void => {
      const { queryByText } = render(
        <PokemonLine
          pokemon={{
            id: "25",
            name: "Bulbasaur",
            slug: "bulbasaur",
            pokedexId: 1,
            sprite: "1.png",
            types: [
              { name: "Poison", slug: "poison" },
              { name: "Grass", slug: "grass" }
            ]
          }}
        />
      );

      expect(queryByText(/Poison/i)).toBeTruthy();
      expect(queryByText(/Grass/i)).toBeTruthy();
    });
  });
});
