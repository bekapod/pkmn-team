import React from "react";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
// tslint:disable-next-line:no-implicit-dependencies
import { fireEvent, render } from "react-testing-library";
// tslint:disable-next-line:no-implicit-dependencies
import wait from "waait";
import PokemonSearchContainer from ".";
import { getAllPokemon } from "../../queries/pokemon";

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: getAllPokemon
    },
    result: {
      data: {
        allPokemon: [
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
        ]
      },
      loading: false
    }
  }
];

describe("<PokemonSearchContainer />", () => {
  it("renders pokemon search input and list of pokemon", async () => {
    const { queryByPlaceholderText, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PokemonSearchContainer />
      </MockedProvider>
    );

    await wait(0);

    expect(queryByPlaceholderText(/Find by name/)).toBeTruthy();
    expect(queryByText(/Pikachu/)).toBeTruthy();
  });

  it("shows list of matching pokemon when user begins to search", async () => {
    const { getByPlaceholderText, queryByText, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PokemonSearchContainer />
      </MockedProvider>
    );

    await wait(0);

    fireEvent.change(getByPlaceholderText(/Find by name/), {
      target: { value: "hau" }
    });

    getByText(/Haunter/);

    expect(queryByText(/Haunter/)).toBeTruthy();
    expect(queryByText(/Pikachu/)).toBeFalsy();
    expect(queryByText(/Charmander/)).toBeFalsy();
  });

  it("shows full list of pokemon when user has cleared their search", async () => {
    const { getByPlaceholderText, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PokemonSearchContainer />
      </MockedProvider>
    );

    await wait(0);

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

  it("doesn't show any pokemon when none are matched", async () => {
    const { getByPlaceholderText, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PokemonSearchContainer />
      </MockedProvider>
    );

    await wait(0);

    fireEvent.change(getByPlaceholderText(/Find by name/), {
      target: { value: "blah" }
    });

    expect(queryByText(/Haunter/)).toBeFalsy();
    expect(queryByText(/Pikachu/)).toBeFalsy();
    expect(queryByText(/Charmander/)).toBeFalsy();
  });
});
