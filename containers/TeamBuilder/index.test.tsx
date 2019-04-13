import React from "react";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
import { render } from "react-testing-library";
import wait from "waait";
import { createTeam, updateTeam } from "../../mutations/team";
import { getTeamById } from "../../queries/team";
import TeamBuilderContainer from ".";

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: createTeam,
      variables: {
        team: {
          name: "Test Team",
          members: [{ pokemonId: "25" }]
        }
      }
    },
    result: {
      createTeam: {
        team: {
          id: "1"
        }
      }
    }
  },

  {
    request: {
      query: updateTeam,
      variables: {
        team: {
          id: "2",
          name: "Test Team 2",
          members: [{ pokemonId: "25" }, { pokemonId: "25" }]
        }
      }
    },
    result: {
      updateTeam: {
        team: {
          id: "2"
        }
      }
    }
  }
];

describe("<TeamBuilderContainer />", (): void => {
  it("renders team creation form", async (): Promise<void> => {
    const { queryByPlaceholderText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TeamBuilderContainer />
      </MockedProvider>
    );

    await wait(0);

    expect(queryByPlaceholderText(/Choose a team name/)).toBeTruthy();
  });

  it("renders team edit form", async (): Promise<void> => {
    const mocksWithTeam: ReadonlyArray<MockedResponse> = [
      ...mocks,
      {
        request: {
          query: getTeamById,
          variables: {
            id: "cji6gz8gwhblk0a9639btq2hd"
          }
        },

        result: {
          data: {
            team: {
              __typename: "Team",
              createdAt: "2018-06-08T21:15:14.723Z",
              id: "cji6gz8gwhblk0a9639btq2hd",
              members: [
                {
                  __typename: "TeamMember",
                  id: "cji6gz8gwhbll0a96aahx3ivv",
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
                    ],
                    moves: []
                  }
                },
                {
                  __typename: "TeamMember",
                  id: "cji6gz8gwhblm0a96eja18t10",
                  order: 2,
                  pokemon: {
                    __typename: "Pokemon",
                    id: "4",
                    name: "Charmander",
                    slug: "charmander",
                    pokedexId: 4,
                    sprite: "4.png",
                    types: [{ __typename: "Type", name: "Fire", slug: "fire" }],
                    moves: []
                  }
                },
                {
                  __typename: "TeamMember",
                  id: "cji6gz8gwhbln0a96q7wmx9zj",
                  order: 3,
                  pokemon: {
                    __typename: "Pokemon",
                    id: "7",
                    name: "Squirtle",
                    slug: "squirtle",
                    pokedexId: 7,
                    sprite: "7.png",
                    types: [
                      { __typename: "Type", name: "Water", slug: "water" }
                    ],
                    moves: []
                  }
                },
                {
                  __typename: "TeamMember",
                  id: "cji6gz8gwhblo0a96wgoki379",
                  order: 4,
                  pokemon: {
                    __typename: "Pokemon",
                    id: "25",
                    name: "Pikachu",
                    slug: "pikachu",
                    pokedexId: 25,
                    sprite: "25.png",
                    types: [
                      {
                        __typename: "Type",
                        name: "Electric",
                        slug: "electric"
                      }
                    ],
                    moves: []
                  }
                }
              ],
              name: "Starters Team"
            }
          }
        }
      }
    ];
    const { team } = mocksWithTeam[2].result.data;
    const { getByValue, queryByValue, queryAllByTestId, queryByText } = render(
      <MockedProvider mocks={mocksWithTeam}>
        <TeamBuilderContainer query={{ teamId: team.id }} />
      </MockedProvider>
    );

    await wait(0);

    getByValue(team.name);
    expect(queryByValue(team.name)).toBeTruthy();
    expect(queryAllByTestId(/pokemon-(\w+)/)).toHaveLength(team.members.length);
    expect(queryByText(/Save team/)).toBeTruthy();
    expect(queryByText(/Delete team/)).toBeTruthy();
  });
});
