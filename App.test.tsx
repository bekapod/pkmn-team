import React from "react";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
// tslint:disable-next-line:no-implicit-dependencies
import wait from "waait";
import App from "./App";
import { createTeam, updateTeam } from "./mutations/team";
import { getAllPokemon } from "./queries/pokemon";
import { getAllTeams, getTeamById } from "./queries/team";
import configureStore from "./store";

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: getAllTeams
    },
    result: {
      data: {
        allTeams: [
          {
            createdAt: "2018-06-08T21:15:14.723Z",
            id: "cji6gz8gwhblk0a9639btq2hd",
            members: [
              {
                id: "cji6gz8gwhbll0a96aahx3ivv",
                pokemon: {
                  name: "bulbasaur",
                  pokedexId: 1,
                  sprite: "1.png",
                  types: ["POISON", "GRASS"]
                }
              },
              {
                id: "cji6gz8gwhblm0a96eja18t10",
                pokemon: {
                  name: "charmander",
                  pokedexId: 4,
                  sprite: "4.png",
                  types: ["FIRE"]
                }
              },
              {
                id: "cji6gz8gwhbln0a96q7wmx9zj",
                pokemon: {
                  id: "7",
                  name: "squirtle",
                  pokedexId: 7,
                  sprite: "7.png",
                  types: ["WATER"]
                }
              },
              {
                id: "cji6gz8gwhblo0a96wgoki379",
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: ["ELECTRIC"]
                }
              }
            ],
            name: "Starters Team"
          },
          {
            createdAt: "2018-06-08T23:06:11.936Z",
            id: "cji6kxx7gp5n80a96mgw7gc45",
            members: [
              {
                id: "cji6kxx7hp5n90a96r5rpx50u",
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: ["ELECTRIC"]
                }
              },
              {
                id: "cji6kxx7hp5na0a96hb6e0643",
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: ["ELECTRIC"]
                }
              },
              {
                id: "cji6kxx7hp5nb0a9629wdve5s",
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: ["ELECTRIC"]
                }
              },
              {
                id: "cji6kxx7hp5nc0a969th9ll1f",
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: ["ELECTRIC"]
                }
              },
              {
                id: "cji6kxx7hp5nd0a968aj6f6qj",
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: ["ELECTRIC"]
                }
              },
              {
                id: "cji6kxx7hp5ne0a964tf72wol",
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: ["ELECTRIC"]
                }
              }
            ],
            name: "Pikachu Team"
          },
          {
            createdAt: "2018-06-08T23:07:46.587Z",
            id: "cji6kzy8pprbq0a964rc3ikk3",
            members: [
              {
                id: "cji6kzy8pprbr0a967jhcik0n",
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: ["ELECTRIC"]
                }
              },
              {
                id: "cji6kzy8pprbs0a96349zeq46",
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: ["ELECTRIC"]
                }
              },
              {
                id: "cji6kzy8pprbt0a96v5isjwvt",
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: ["ELECTRIC"]
                }
              }
            ],
            name: "Pikachu Team"
          }
        ]
      }
    }
  },

  {
    request: {
      query: getTeamById,
      variables: {
        id: "cji6gz8gwhblk0a9639btq2hd"
      }
    },

    result: {
      data: {
        teamById: {
          createdAt: "2018-06-08T21:15:14.723Z",
          id: "cji6gz8gwhblk0a9639btq2hd",
          members: [
            {
              id: "cji6gz8gwhbll0a96aahx3ivv",
              pokemon: {
                name: "bulbasaur",
                pokedexId: 1,
                sprite: "1.png",
                types: ["POISON", "GRASS"]
              }
            },
            {
              id: "cji6gz8gwhblm0a96eja18t10",
              pokemon: {
                name: "charmander",
                pokedexId: 4,
                sprite: "4.png",
                types: ["FIRE"]
              }
            },
            {
              id: "cji6gz8gwhbln0a96q7wmx9zj",
              pokemon: {
                id: "7",
                name: "squirtle",
                pokedexId: 7,
                sprite: "7.png",
                types: ["WATER"]
              }
            },
            {
              id: "cji6gz8gwhblo0a96wgoki379",
              pokemon: {
                id: "25",
                name: "pikachu",
                pokedexId: 25,
                sprite: "25.png",
                types: ["ELECTRIC"]
              }
            }
          ],
          name: "Starters Team"
        }
      }
    }
  },

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
      query: updateTeam,
      variables: {
        id: "1",
        name: "Test Team",
        pokedexIds: [25]
      }
    },
    result: {
      updateTeam: {
        id: "1"
      }
    }
  },

  {
    request: {
      query: createTeam,
      variables: {
        name: "Test Team 2",
        pokedexIds: [25, 25]
      }
    },
    result: {
      createTeam: {
        id: "2"
      }
    }
  }
];

describe("<App />", () => {
  it("renders dashboard", async () => {
    const { queryByText } = render(
      <Provider store={configureStore({})}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );

    await wait(0);

    expect(queryByText(/My Teams/)).toBeTruthy();
    expect(queryByText(/Create a team/)).toBeTruthy();
  });

  it("renders create a team form", async () => {
    const { queryByText } = render(
      <Provider store={configureStore({})}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/team/create/"]}>
            <App />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );

    await wait(0);

    expect(queryByText(/Create a Team/)).toBeTruthy();
  });

  it("renders edit team form", async () => {
    const { queryByText } = render(
      <Provider store={configureStore({})}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter
            initialEntries={["/team/edit/cji6gz8gwhblk0a9639btq2hd"]}
          >
            <App />
          </MemoryRouter>
        </MockedProvider>
      </Provider>
    );

    await wait(0);

    expect(queryByText(/Edit Team/)).toBeTruthy();
    expect(queryByText(/Save team/)).toBeTruthy();
  });
});