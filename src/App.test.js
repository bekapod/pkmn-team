// @flow
import React from "react";
import MemoryRouter from "react-router-dom/MemoryRouter";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import wait from "waait";
import configureStore from "redux-mock-store";
import App from "./App";
import { getAllTeams } from "./queries/team";
import { getAllPokemon } from "./queries/pokemon";
import { createTeam } from "./mutations/team";

const mocks = [
  {
    request: {
      query: getAllTeams
    },
    result: {
      loading: false,
      data: {
        allTeams: [
          {
            id: "cji6gz8gwhblk0a9639btq2hd",
            name: "Starters Team",
            createdAt: "2018-06-08T21:15:14.723Z",
            members: [
              {
                id: "cji6gz8gwhbll0a96aahx3ivv",
                pokemon: {
                  pokedexId: 1,
                  name: "bulbasaur",
                  types: ["POISON", "GRASS"],
                  sprite: "1.png"
                }
              },
              {
                id: "cji6gz8gwhblm0a96eja18t10",
                pokemon: {
                  pokedexId: 4,
                  name: "charmander",
                  types: ["FIRE"],
                  sprite: "4.png"
                }
              },
              {
                id: "cji6gz8gwhbln0a96q7wmx9zj",
                pokemon: {
                  pokedexId: 7,
                  name: "squirtle",
                  types: ["WATER"],
                  sprite: "7.png"
                }
              },
              {
                id: "cji6gz8gwhblo0a96wgoki379",
                pokemon: {
                  pokedexId: 25,
                  name: "pikachu",
                  types: ["ELECTRIC"],
                  sprite: "25.png"
                }
              }
            ]
          },
          {
            id: "cji6kxx7gp5n80a96mgw7gc45",
            name: "Pikachu Team",
            createdAt: "2018-06-08T23:06:11.936Z",
            members: [
              {
                id: "cji6kxx7hp5n90a96r5rpx50u",
                pokemon: {
                  pokedexId: 25,
                  name: "pikachu",
                  types: ["ELECTRIC"],
                  sprite: "25.png"
                }
              },
              {
                id: "cji6kxx7hp5na0a96hb6e0643",
                pokemon: {
                  pokedexId: 25,
                  name: "pikachu",
                  types: ["ELECTRIC"],
                  sprite: "25.png"
                }
              },
              {
                id: "cji6kxx7hp5nb0a9629wdve5s",
                pokemon: {
                  pokedexId: 25,
                  name: "pikachu",
                  types: ["ELECTRIC"],
                  sprite: "25.png"
                }
              },
              {
                id: "cji6kxx7hp5nc0a969th9ll1f",
                pokemon: {
                  pokedexId: 25,
                  name: "pikachu",
                  types: ["ELECTRIC"],
                  sprite: "25.png"
                }
              },
              {
                id: "cji6kxx7hp5nd0a968aj6f6qj",
                pokemon: {
                  pokedexId: 25,
                  name: "pikachu",
                  types: ["ELECTRIC"],
                  sprite: "25.png"
                }
              },
              {
                id: "cji6kxx7hp5ne0a964tf72wol",
                pokemon: {
                  pokedexId: 25,
                  name: "pikachu",
                  types: ["ELECTRIC"],
                  sprite: "25.png"
                }
              }
            ]
          },
          {
            id: "cji6kzy8pprbq0a964rc3ikk3",
            name: "Pikachu Team",
            createdAt: "2018-06-08T23:07:46.587Z",
            members: [
              {
                id: "cji6kzy8pprbr0a967jhcik0n",
                pokemon: {
                  pokedexId: 25,
                  name: "pikachu",
                  types: ["ELECTRIC"],
                  sprite: "25.png"
                }
              },
              {
                id: "cji6kzy8pprbs0a96349zeq46",
                pokemon: {
                  pokedexId: 25,
                  name: "pikachu",
                  types: ["ELECTRIC"],
                  sprite: "25.png"
                }
              },
              {
                id: "cji6kzy8pprbt0a96v5isjwvt",
                pokemon: {
                  pokedexId: 25,
                  name: "pikachu",
                  types: ["ELECTRIC"],
                  sprite: "25.png"
                }
              }
            ]
          }
        ]
      }
    }
  },

  {
    request: {
      query: getAllPokemon
    },
    result: {
      loading: false,
      data: {
        allPokemon: [
          {
            pokedexId: 25,
            name: "pikachu",
            types: ["ELECTRIC"],
            sprite: "25.png"
          }
        ]
      }
    }
  },

  {
    request: {
      mutation: createTeam,
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

describe("<App />", () => {
  const mockStore = configureStore();

  it("renders dashboard", async () => {
    const tree = renderer.create(
      <Provider store={mockStore({})}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );

    await wait(0);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders create a team form", () => {
    const tree = renderer.create(
      <Provider store={mockStore({})}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/team/create/"]}>
            <App />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
