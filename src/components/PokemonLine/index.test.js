// @flow
import React from "react";
import renderer from "react-test-renderer";
import PokemonLine from ".";

describe("<PokemonLine />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(
      <PokemonLine
        pokemon={{
          name: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: ["ELECTRIC"]
        }}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe("when outdent is passed", () => {
    it("renders without crashing", () => {
      const tree = renderer.create(
        <PokemonLine
          pokemon={{
            name: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: ["ELECTRIC"]
          }}
          outdent={10}
        />
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("when a pokemon with more than one type is passed", () => {
    it("renders all types", () => {
      const tree = renderer.create(
        <PokemonLine
          pokemon={{
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

  describe("when a pokemon with no type is passed", () => {
    it("renders without crashing", () => {
      const tree = renderer.create(
        <PokemonLine
          pokemon={{
            name: "pikachu",
            pokedexId: 25,
            sprite: "25.png"
          }}
        />
      );

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("when a pokemon with incomplete / invalid data is passed", () => {
    it("renders without crashing", () => {
      const tree = renderer.create(<PokemonLine pokemon={{}} />);

      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
