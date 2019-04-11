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
            __typename: "Team",
            createdAt: "2018-06-08T21:15:14.723Z",
            id: "cji6gz8gwhblk0a9639btq2hdczx",
            members: [
              {
                __typename: "TeamMember",
                id: "cji6gz8gwhbll0a96aahx3ivvyuizxc",
                order: 1,
                pokemon: {
                  __typename: "Pokemon",
                  id: "1",
                  name: "Bulbasaur",
                  slug: "bulbasaur",
                  pokedexId: 1,
                  sprite: "1.png",
                  types: [
                    { __typename: "Type", name: "Poison", slug: "poison" },
                    { __typename: "Type", name: "Grass", slug: "grass" }
                  ]
                }
              },
              {
                __typename: "TeamMember",
                id: "cji6gz8gwhblm0a96eja18t10rty",
                order: 2,
                pokemon: {
                  __typename: "Pokemon",
                  id: "4",
                  name: "Charmander",
                  slug: "charmander",
                  pokedexId: 4,
                  sprite: "4.png",
                  types: [{ __typename: "Type", name: "Fire", slug: "fire" }]
                }
              },
              {
                __typename: "TeamMember",
                id: "cji6gz8gwhbln0a96q7wmx9zjqwe",
                order: 3,
                pokemon: {
                  __typename: "Pokemon",
                  id: "7",
                  name: "Squirtle",
                  slug: "squirtle",
                  pokedexId: 7,
                  sprite: "7.png",
                  types: [{ __typename: "Type", name: "Water", slug: "water" }]
                }
              },
              {
                __typename: "TeamMember",
                id: "cji6gz8gwhblo0a96wgoki379das",
                order: 4,
                pokemon: {
                  __typename: "Pokemon",
                  id: "25",
                  name: "Pikachu",
                  slug: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [
                    { __typename: "Type", name: "Electric", slug: "electric" }
                  ]
                }
              }
            ],
            name: "Starters Team"
          },
          {
            __typename: "Team",
            createdAt: "2018-06-08T23:06:11.936Z",
            id: "cji6kxx7gp5n80a96mgw7gc45qaz",
            loading: false,
            members: [
              {
                __typename: "TeamMember",
                id: "cji6kxx7hp5n90a96r5rpx50uwsx",
                order: 1,
                pokemon: {
                  __typename: "Pokemon",
                  id: "25",
                  name: "Pikachu",
                  slug: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [
                    { __typename: "Type", name: "Electric", slug: "electric" }
                  ]
                }
              },
              {
                __typename: "TeamMember",
                id: "cji6kxx7hp5na0a96hb6e0643edc",
                order: 2,
                pokemon: {
                  __typename: "Pokemon",
                  id: "25",
                  name: "Pikachu",
                  slug: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [
                    { __typename: "Type", name: "Electric", slug: "electric" }
                  ]
                }
              },
              {
                __typename: "TeamMember",
                id: "cji6kxx7hp5nb0a9629wdve5srfv",
                order: 3,
                pokemon: {
                  __typename: "Pokemon",
                  id: "25",
                  name: "Pikachu",
                  slug: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [
                    { __typename: "Type", name: "Electric", slug: "electric" }
                  ]
                }
              },
              {
                __typename: "TeamMember",
                id: "cji6kxx7hp5nb0a9629wdve5stgb",
                order: 4,
                pokemon: {
                  __typename: "Pokemon",
                  id: "25",
                  name: "Pikachu",
                  slug: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [
                    { __typename: "Type", name: "Electric", slug: "electric" }
                  ]
                }
              },
              {
                __typename: "TeamMember",
                id: "cji6kxx7hp5nb0a9629wdve5syhn",
                order: 5,
                pokemon: {
                  __typename: "Pokemon",
                  id: "25",
                  name: "Pikachu",
                  slug: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [
                    { __typename: "Type", name: "Electric", slug: "electric" }
                  ]
                }
              },
              {
                __typename: "TeamMember",
                id: "cji6kxx7hp5nb0a9629wdve5sujm",
                order: 6,
                pokemon: {
                  __typename: "Pokemon",
                  id: "25",
                  name: "Pikachu",
                  slug: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [
                    { __typename: "Type", name: "Electric", slug: "electric" }
                  ]
                }
              }
            ],
            name: "Pikachu Team"
          },
          {
            __typename: "Team",
            createdAt: "2018-06-08T23:07:46.587Z",
            id: "cji6kzy8pprbq0a964rc3ikk3ik,",
            members: [
              {
                __typename: "TeamMember",
                id: "cji6kxx7hp5nb0a9629wdve5s",
                order: 3,
                pokemon: {
                  __typename: "Pokemon",
                  id: "25",
                  name: "Pikachu",
                  slug: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [
                    { __typename: "Type", name: "Electric", slug: "electric" }
                  ]
                }
              },
              {
                __typename: "TeamMember",
                id: "cji6kxx7hp5nb0a9629wdve5sol.",
                order: 3,
                pokemon: {
                  __typename: "Pokemon",
                  id: "25",
                  name: "Pikachu",
                  slug: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [
                    { __typename: "Type", name: "Electric", slug: "electric" }
                  ]
                }
              },
              {
                __typename: "TeamMember",
                id: "cji6kxx7hp5nb0a9629wdve5sp;/",
                order: 3,
                pokemon: {
                  __typename: "Pokemon",
                  id: "25",
                  name: "Pikachu",
                  slug: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [
                    { __typename: "Type", name: "Electric", slug: "electric" }
                  ]
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
      <MockedProvider mocks={mocks}>
        <DashboardContainer />
      </MockedProvider>
    );

    await wait(0);

    expect(getAllByTestId(/team-link-(\w+)/)).toHaveLength(3);
  });
});
