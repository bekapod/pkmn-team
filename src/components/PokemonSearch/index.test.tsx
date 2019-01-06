import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
// tslint:disable-next-line:no-implicit-dependencies
import { cleanup, fireEvent, render } from "react-testing-library";
import PokemonSearch from ".";
import { IPokemon } from "../../types";

describe("<PokemonSearch />", () => {
  const pokemon: IPokemon[] = [
    {
      id: "4",
      name: "charmander",
      pokedexId: 4,
      sprite: "4.png",
      types: ["FIRE"]
    },
    {
      id: "25",
      name: "pikachu",
      pokedexId: 25,
      sprite: "25.png",
      types: ["ELECTRIC"]
    },
    {
      id: "93",
      name: "haunter",
      pokedexId: 93,
      sprite: "93.png",
      types: ["GHOST", "POISON"]
    }
  ];

  afterEach(() => {
    cleanup();
  });

  it("renders without crashing", () => {
    const setCurrentSearchPokemon = () => null;
    const tree = renderer.create(
      <PokemonSearch
        pokemon={pokemon}
        setCurrentSearchPokemon={setCurrentSearchPokemon}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("shows list of matching pokemon when user begins to search", () => {
    const setCurrentSearchPokemon = () => null;
    const { getByPlaceholderText, queryByText } = render(
      <PokemonSearch
        pokemon={pokemon}
        setCurrentSearchPokemon={setCurrentSearchPokemon}
      />
    );

    fireEvent.change(getByPlaceholderText(/Choose a Pokemon/), {
      target: { value: "hau" }
    });

    expect(queryByText(/Haunter/)).toBeTruthy();
    expect(queryByText(/Pikachu/)).toBeFalsy();
    expect(queryByText(/Charmander/)).toBeFalsy();
  });

  it("shows full list of pokemon when user has cleared their search", () => {
    const setCurrentSearchPokemon = () => null;
    const { getByPlaceholderText, queryByText } = render(
      <PokemonSearch
        pokemon={pokemon}
        setCurrentSearchPokemon={setCurrentSearchPokemon}
      />
    );

    fireEvent.change(getByPlaceholderText(/Choose a Pokemon/), {
      target: { value: "hau" }
    });

    fireEvent.change(getByPlaceholderText(/Choose a Pokemon/), {
      target: { value: "" }
    });

    expect(queryByText(/Haunter/)).toBeTruthy();
    expect(queryByText(/Pikachu/)).toBeTruthy();
    expect(queryByText(/Charmander/)).toBeTruthy();
  });

  it("doesn't show any pokemon when none are matched", () => {
    const setCurrentSearchPokemon = () => null;
    const { getByPlaceholderText, queryByText } = render(
      <PokemonSearch
        pokemon={pokemon}
        setCurrentSearchPokemon={setCurrentSearchPokemon}
      />
    );

    fireEvent.change(getByPlaceholderText(/Choose a Pokemon/), {
      target: { value: "blah" }
    });

    expect(queryByText(/Haunter/)).toBeFalsy();
    expect(queryByText(/Pikachu/)).toBeFalsy();
    expect(queryByText(/Charmander/)).toBeFalsy();
  });

  it("calls setCurrentSearchPokemon when user clicks a pokemon result", () => {
    const setCurrentSearchPokemon = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <PokemonSearch
        pokemon={pokemon}
        setCurrentSearchPokemon={setCurrentSearchPokemon}
      />
    );

    expect(setCurrentSearchPokemon).toBeCalledTimes(0);

    fireEvent.change(getByPlaceholderText(/Choose a Pokemon/), {
      target: { value: "hau" }
    });

    expect(setCurrentSearchPokemon).toBeCalledTimes(0);

    fireEvent.click(getByTestId("autocomplete-result-93"));

    expect(setCurrentSearchPokemon).toBeCalledTimes(1);
    expect(setCurrentSearchPokemon).toBeCalledWith(pokemon[2]);
  });
});
