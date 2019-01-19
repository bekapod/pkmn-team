import React from "react";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
// tslint:disable-next-line:no-implicit-dependencies
import wait from "waait";
import TeamBuilderContainer from ".";
import { getAllPokemon } from "../../queries/pokemon";
import configureStore from "../../store";

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: getAllPokemon
    },
    result: {
      data: {
        allPokemon: [
          {
            id: "25",
            name: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: ["ELECTRIC"]
          }
        ]
      },
      loading: false
    }
  }
];

describe("PokemonSearchContainer />", () => {
  it("renders pokemon search input and list of pokemon", async () => {
    const { queryByPlaceholderText, queryByText } = render(
      <Provider store={configureStore({})}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/team/create/"]}>
            <TeamBuilderContainer />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );

    await wait(0);

    expect(queryByPlaceholderText(/Find by name/)).toBeTruthy();
    expect(queryByText(/Pikachu/)).toBeTruthy();
  });
});
