import React from "react";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
import { fireEvent, render } from "react-testing-library";
import wait from "waait";
import PokemonSearchContainer from ".";
import { getPokemon } from "../../queries/pokemon";

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: getPokemon
    },
    result: {
      data: {
        pokemon: [
          {
            __typename: "Pokemon",
            id: "4",
            name: "Charmander",
            slug: "charmander",
            pokedexId: 4,
            sprite: "4.png",
            types: [{ __typename: "Type", name: "Fire", slug: "fire" }]
          },
          {
            __typename: "Pokemon",
            id: "25",
            name: "Pikachu",
            slug: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: [{ __typename: "Type", name: "Electric", slug: "electric" }]
          },
          {
            __typename: "Pokemon",
            id: "93",
            name: "Haunter",
            slug: "haunter",
            pokedexId: 93,
            sprite: "93.png",
            types: [
              { __typename: "Type", name: "Ghost", slug: "ghost" },
              { __typename: "Type", name: "Poison", slug: "poison" }
            ]
          }
        ]
      },
      loading: false
    }
  }
];

describe("<PokemonSearchContainer />", (): void => {
  it("renders pokemon search input and list of pokemon", async (): Promise<
    void
  > => {
    const { queryByPlaceholderText, queryByText } = render(
      <MockedProvider mocks={mocks}>
        <PokemonSearchContainer />
      </MockedProvider>
    );

    await wait(0);

    expect(queryByPlaceholderText(/Find by name/)).toBeTruthy();
    expect(queryByText(/Pikachu/)).toBeTruthy();
  });

  it("shows list of matching pokemon when user begins to search", async (): Promise<
    void
  > => {
    const { getByPlaceholderText, queryByText } = render(
      <MockedProvider mocks={mocks}>
        <PokemonSearchContainer />
      </MockedProvider>
    );

    await wait(0);

    fireEvent.change(getByPlaceholderText(/Find by name/), {
      target: { value: "Hau" }
    });

    expect(queryByText(/Haunter/)).toBeTruthy();
    expect(queryByText(/Pikachu/)).toBeFalsy();
    expect(queryByText(/Charmander/)).toBeFalsy();
  });

  it("shows full list of pokemon when user has cleared their search", async (): Promise<
    void
  > => {
    const { getByPlaceholderText, queryByText } = render(
      <MockedProvider mocks={mocks}>
        <PokemonSearchContainer />
      </MockedProvider>
    );

    await wait(0);

    fireEvent.change(getByPlaceholderText(/Find by name/), {
      target: { value: "Hau" }
    });

    expect(queryByText(/Pikachu/)).toBeFalsy();

    fireEvent.change(getByPlaceholderText(/Find by name/), {
      target: { value: "" }
    });

    expect(queryByText(/Haunter/)).toBeTruthy();
    expect(queryByText(/Pikachu/)).toBeTruthy();
    expect(queryByText(/Charmander/)).toBeTruthy();
  });

  it("doesn't show any pokemon when none are matched", async (): Promise<
    void
  > => {
    const { getByPlaceholderText, queryByText } = render(
      <MockedProvider mocks={mocks}>
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
