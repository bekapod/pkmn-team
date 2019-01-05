import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
import PokemonCard from ".";

describe("<PokemonCard />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(
      <PokemonCard
        pokemon={{
          id: "25",
          name: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: ["ELECTRIC"]
        }}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe("when pokemon is part of a team (has a member id)", () => {
    it("renders without crashing", () => {
      const tree = renderer.create(
        <PokemonCard
          memberId="7"
          pokemon={{
            id: "25",
            name: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: ["ELECTRIC"]
          }}
        />
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("when a renderCardActions function is passed", () => {
    it("renders the card actions", () => {
      const renderCardActions = () => (
        <div>Card actions that should be rendered</div>
      );
      const tree = renderer.create(
        <PokemonCard
          pokemon={{
            id: "25",
            name: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: ["ELECTRIC"]
          }}
          renderCardActions={renderCardActions}
        />
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("when a pokemon with more than one type is passed", () => {
    it("renders all types", () => {
      const tree = renderer.create(
        <PokemonCard
          pokemon={{
            id: "25",
            name: "bulbasaur",
            pokedexId: 1,
            sprite: "1.png",
            types: ["POISON", "GRASS"]
          }}
        />
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
