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
    const fnStub = () => null;
    const { queryByPlaceholderText } = render(
      <PokemonSearch
        highlightedIndex={0}
        pokemon={pokemon}
        filteredList={pokemon}
        setCurrentSelection={fnStub}
        setHighlightedIndex={fnStub}
        setInputValue={fnStub}
        setUnfilteredList={fnStub}
      />
    );

    expect(queryByPlaceholderText(/Find by name/)).toBeTruthy();
  });

  it("calls setCurrentSelection when user clicks a pokemon result", () => {
    const setCurrentSelection = jest.fn();
    const fnStub = () => null;
    const { getByPlaceholderText, getByTestId } = render(
      <PokemonSearch
        highlightedIndex={0}
        pokemon={pokemon}
        filteredList={pokemon}
        setCurrentSelection={setCurrentSelection}
        setHighlightedIndex={fnStub}
        setInputValue={fnStub}
        setUnfilteredList={fnStub}
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
