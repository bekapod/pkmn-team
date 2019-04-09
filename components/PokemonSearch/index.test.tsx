import React from "react";
import { fireEvent, render } from "react-testing-library";
import PokemonSearch from ".";
import { Pokemon } from "../../types";

describe("<PokemonSearch />", () => {
  const pokemon: Pokemon[] = [
    {
      id: "4",
      name: "Charmander",
      slug: "charmander",
      pokedexId: 4,
      sprite: "4.png",
      types: [{ name: "Fire", slug: "fire" }]
    },
    {
      id: "25",
      name: "Pikachu",
      slug: "pikachu",
      pokedexId: 25,
      sprite: "25.png",
      types: [{ name: "Electric", slug: "electric" }]
    },
    {
      id: "93",
      name: "Haunter",
      slug: "haunter",
      pokedexId: 93,
      sprite: "93.png",
      types: [
        { name: "Ghost", slug: "ghost" },
        { name: "Poison", slug: "poison" }
      ]
    }
  ];

  it("renders search input", () => {
    const fnStub = (): null => null;
    const { queryByPlaceholderText } = render(
      <PokemonSearch pokemon={pokemon} setCurrentSearchPokemon={fnStub} />
    );

    expect(queryByPlaceholderText(/Find by name/)).toBeTruthy();
  });

  it("calls setCurrentSelection when user clicks a pokemon result", () => {
    const setCurrentSearchPokemon = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <PokemonSearch
        pokemon={pokemon}
        setCurrentSearchPokemon={setCurrentSearchPokemon}
      />
    );

    expect(setCurrentSearchPokemon).toBeCalledTimes(0);

    fireEvent.change(getByPlaceholderText(/Find by name/), {
      target: { value: "Hau" }
    });

    expect(setCurrentSearchPokemon).toBeCalledTimes(0);

    fireEvent.click(getByTestId("autocomplete-result-93"));

    expect(setCurrentSearchPokemon).toBeCalledTimes(1);
    expect(setCurrentSearchPokemon).toBeCalledWith({
      variables: { pokemon: pokemon[2] }
    });
  });
});
