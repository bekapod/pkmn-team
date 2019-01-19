import React from "react";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
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

describe("<TeamViewContainer />", () => {
  it("renders pokemon search input, list of pokemon and currently selected pokemon", async () => {
    const { queryByPlaceholderText, queryByText, queryAllByTestId } = render(
      <Provider
        store={configureStore({
          pokemonSearch: {
            currentSelection: {
              id: "1",
              name: "bulbasaur",
              pokedexId: 1,
              sprite: "1.png",
              types: ["POISON", "GRASS"]
            }
          },
          teamBuilder: {
            members: {
              cji6gz8gwhbll0a96aahx3ivv: {
                id: "cji6gz8gwhbll0a96aahx3ivv",
                pokemon: {
                  id: "1",
                  name: "bulbasaur",
                  pokedexId: 1,
                  sprite: "1.png",
                  types: ["POISON", "GRASS"]
                }
              },
              cji6gz8gwhblm0a96eja18t10: {
                id: "cji6gz8gwhblm0a96eja18t10",
                pokemon: {
                  id: "4",
                  name: "charmander",
                  pokedexId: 4,
                  sprite: "4.png",
                  types: ["FIRE"]
                }
              }
            },
            name: ""
          }
        })}
      >
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/team/edit/1"]}>
            <TeamBuilderContainer />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );

    await wait(0);

    expect(queryByPlaceholderText(/Find by name/)).toBeTruthy();
    expect(queryByText(/Pikachu/)).toBeTruthy();

    expect(queryAllByTestId(/tab-item-/)).toHaveLength(3);
    expect(queryAllByTestId(/tab-content-/)).toHaveLength(3);

    expect(
      queryByText(/bulbasaur/i, {
        selector: '[data-testid="tab-content-add-pokemon"] *'
      })
    ).toBeTruthy();
  });
});
