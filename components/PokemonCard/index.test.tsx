import React from "react";
import { render } from "react-testing-library";
import PokemonCard from ".";

describe("<PokemonCard />", (): void => {
  it("renders pokemon name and types", (): void => {
    const { queryByText } = render(
      <PokemonCard
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

  describe("when pokemon is part of a team (has a member id)", (): void => {
    it("renders pokemon name and types", (): void => {
      const { queryByText } = render(
        <PokemonCard
          memberId="7"
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
  });

  describe("when a renderCardActions function is passed", (): void => {
    it("renders the card actions", (): void => {
      const renderCardActions = (): JSX.Element => (
        <div>Card actions that should be rendered</div>
      );
      const { queryByText } = render(
        <PokemonCard
          pokemon={{
            id: "25",
            name: "Pikachu",
            slug: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: [{ name: "Electric", slug: "electric" }]
          }}
          renderCardActions={renderCardActions}
        />
      );

      expect(queryByText(/Card actions that should be rendered/)).toBeTruthy();
    });
  });

  describe("when a pokemon with more than one type is passed", (): void => {
    it("renders all types", (): void => {
      const { queryByText } = render(
        <PokemonCard
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
