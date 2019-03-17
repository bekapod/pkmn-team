import React from "react";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
// tslint:disable-next-line:no-implicit-dependencies
import wait from "waait";
import DashboardContainer from ".";
import { getAllTeams } from "../../queries/team";

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: getAllTeams
    },
    result: {
      data: {
        teams: [
          {
            insertedAt: "2018-06-08T21:15:14.723Z",
            id: "cji6gz8gwhblk0a9639btq2hd",
            members: [
              {
                id: "cji6gz8gwhbll0a96aahx3ivv",
                order: 1,
                pokemon: {
                  name: "bulbasaur",
                  pokedexId: 1,
                  sprite: "1.png",
                  types: [{ name: "POISON" }, { name: "GRASS" }]
                }
              },
              {
                id: "cji6gz8gwhblm0a96eja18t10",
                order: 2,
                pokemon: {
                  name: "charmander",
                  pokedexId: 4,
                  sprite: "4.png",
                  types: [{ name: "FIRE" }]
                }
              },
              {
                id: "cji6gz8gwhbln0a96q7wmx9zj",
                order: 3,
                pokemon: {
                  id: "7",
                  name: "squirtle",
                  pokedexId: 7,
                  sprite: "7.png",
                  types: [{ name: "WATER" }]
                }
              },
              {
                id: "cji6gz8gwhblo0a96wgoki379",
                order: 4,
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [{ name: "ELECTRIC" }]
                }
              }
            ],
            name: "Starters Team"
          },
          {
            insertedAt: "2018-06-08T23:06:11.936Z",
            id: "cji6kxx7gp5n80a96mgw7gc45",
            loading: false,
            members: [
              {
                id: "cji6kxx7hp5n90a96r5rpx50u",
                order: 1,
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [{ name: "ELECTRIC" }]
                }
              },
              {
                id: "cji6kxx7hp5na0a96hb6e0643",
                order: 2,
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [{ name: "ELECTRIC" }]
                }
              },
              {
                id: "cji6kxx7hp5nb0a9629wdve5s",
                order: 3,
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [{ name: "ELECTRIC" }]
                }
              },
              {
                id: "cji6kxx7hp5nc0a969th9ll1f",
                order: 4,
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [{ name: "ELECTRIC" }]
                }
              },
              {
                id: "cji6kxx7hp5nd0a968aj6f6qj",
                order: 5,
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [{ name: "ELECTRIC" }]
                }
              },
              {
                id: "cji6kxx7hp5ne0a964tf72wol",
                order: 6,
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [{ name: "ELECTRIC" }]
                }
              }
            ],
            name: "Pikachu Team"
          },
          {
            insertedAt: "2018-06-08T23:07:46.587Z",
            id: "cji6kzy8pprbq0a964rc3ikk3",
            members: [
              {
                id: "cji6kzy8pprbr0a967jhcik0n",
                order: 1,
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [{ name: "ELECTRIC" }]
                }
              },
              {
                id: "cji6kzy8pprbs0a96349zeq46",
                order: 2,
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [{ name: "ELECTRIC" }]
                }
              },
              {
                id: "cji6kzy8pprbt0a96v5isjwvt",
                order: 3,
                pokemon: {
                  id: "25",
                  name: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [{ name: "ELECTRIC" }]
                }
              }
            ],
            name: "Pikachu Team"
          }
        ]
      }
    }
  }
];

describe("<DashboardContainer />", () => {
  it("renders with correct number of team members", async () => {
    const { getAllByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DashboardContainer />
      </MockedProvider>
    );

    await wait(0);

    expect(getAllByTestId(/team-link-(\w+)/)).toHaveLength(3);
  });
});
