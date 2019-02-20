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
            loading: false,
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
  }
];

describe("<DashboardContainer />", () => {
  it("renders with correct number of team members", async () => {
    const { queryByText, getAllByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DashboardContainer />
      </MockedProvider>
    );

    await wait(0);

    expect(getAllByTestId(/team-link-(\w+)/)).toHaveLength(3);
  });
});
