import React from "react";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
// tslint:disable-next-line:no-implicit-dependencies
import configureStore from "redux-mock-store";
// tslint:disable-next-line:no-implicit-dependencies
import wait from "waait";
import TeamBuilderContainer from ".";
import { createTeam } from "../../mutations/team";
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
  },

  {
    request: {
      query: createTeam,
      variables: {
        name: "Test Team",
        pokedexIds: [25]
      }
    },
    result: {
      createTeam: {
        id: "1"
      }
    }
  }
];

describe("<TeamBuilderContainer />", () => {
  const mockStore = configureStore();

  it("renders team builder", async () => {
    const tree = renderer.create(
      <Provider
        store={mockStore({
          currentSearchPokemon: {
            id: "93",
            name: "haunter",
            pokedexId: 93,
            sprite: "93.png",
            types: ["GHOST", "POISON"]
          },
          members: {
            "1": {
              id: "1",
              pokemon: {
                id: "4",
                name: "charmander",
                pokedexId: 4,
                sprite: "4.png",
                types: ["FIRE"]
              }
            },
            "2": {
              id: "2",
              pokemon: {
                id: "25",
                name: "pikachu",
                pokedexId: 25,
                sprite: "25.png",
                types: ["ELECTRIC"]
              }
            },
            "3": {
              id: "3",
              pokemon: {
                id: "93",
                name: "haunter",
                pokedexId: 93,
                sprite: "93.png",
                types: ["GHOST", "POISON"]
              }
            }
          },
          name: "My Team"
        })}
      >
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/team/create/"]}>
            <TeamBuilderContainer />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );

    await wait(0);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
