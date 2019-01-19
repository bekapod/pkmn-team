import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { fireEvent, render } from "react-testing-library";
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

  it("renders search input", () => {
    const setCurrentSelection = () => null;
    const { queryByPlaceholderText } = render(
      <PokemonSearch
        pokemon={pokemon}
        setCurrentSelection={setCurrentSelection}
      />
    );

    expect(queryByPlaceholderText(/Find by name/)).toBeTruthy();
  });

  it("shows list of matching pokemon when user begins to search", () => {
    const setCurrentSelection = () => null;
    const { getByPlaceholderText, queryByText } = render(
      <PokemonSearch
        pokemon={pokemon}
        setCurrentSelection={setCurrentSelection}
      />
    );

    fireEvent.change(getByPlaceholderText(/Find by name/), {
      target: { value: "hau" }
    });

    expect(queryByText(/Haunter/)).toBeTruthy();
    expect(queryByText(/Pikachu/)).toBeFalsy();
    expect(queryByText(/Charmander/)).toBeFalsy();
  });

  it("shows full list of pokemon when user has cleared their search", () => {
    const setCurrentSelection = () => null;
    const { getByPlaceholderText, queryByText } = render(
      <PokemonSearch
        pokemon={pokemon}
        setCurrentSelection={setCurrentSelection}
      />
    );

    fireEvent.change(getByPlaceholderText(/Find by name/), {
      target: { value: "hau" }
    });

    fireEvent.change(getByPlaceholderText(/Find by name/), {
      target: { value: "" }
    });

    expect(queryByText(/Haunter/)).toBeTruthy();
    expect(queryByText(/Pikachu/)).toBeTruthy();
    expect(queryByText(/Charmander/)).toBeTruthy();
  });

  it("doesn't show any pokemon when none are matched", () => {
    const setCurrentSelection = () => null;
    const { getByPlaceholderText, queryByText } = render(
      <PokemonSearch
        pokemon={pokemon}
        setCurrentSelection={setCurrentSelection}
      />
    );

    fireEvent.change(getByPlaceholderText(/Find by name/), {
      target: { value: "blah" }
    });

    expect(queryByText(/Haunter/)).toBeFalsy();
    expect(queryByText(/Pikachu/)).toBeFalsy();
    expect(queryByText(/Charmander/)).toBeFalsy();
  });

  it("calls setCurrentSelection when user clicks a pokemon result", () => {
    const setCurrentSelection = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <PokemonSearch
        pokemon={pokemon}
        setCurrentSelection={setCurrentSelection}
      />
    );

    expect(setCurrentSelection).toBeCalledTimes(0);

    fireEvent.change(getByPlaceholderText(/Find by name/), {
      target: { value: "hau" }
    });

    expect(setCurrentSelection).toBeCalledTimes(0);

    fireEvent.click(getByTestId("autocomplete-result-93"));

    expect(setCurrentSelection).toBeCalledTimes(1);
    expect(setCurrentSelection).toBeCalledWith(pokemon[2]);
  });
});
