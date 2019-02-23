import React from "react";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
// tslint:disable-next-line:no-implicit-dependencies
import wait from "waait";
import { createTeam, updateTeam } from "../../mutations/team";
import { getTeamById } from "../../queries/team";
import TeamBuilderContainer from ".";

const mocks: ReadonlyArray<MockedResponse> = [
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
  },

  {
    request: {
      query: updateTeam,
      variables: {
        id: "2",
        name: "Test Team 2",
        pokedexIds: [25, 25]
      }
    },
    result: {
      updateTeam: {
        id: "2"
      }
    }
  }
];

describe("<TeamBuilderContainer />", () => {
  it("renders team creation form", async () => {
    const { queryByPlaceholderText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TeamBuilderContainer />
      </MockedProvider>
    );

    await wait(0);

    expect(queryByPlaceholderText(/Choose a team name/)).toBeTruthy();
  });

  it("renders team edit form", async () => {
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
            teamById: {
              createdAt: "2018-06-08T21:15:14.723Z",
              id: "cji6gz8gwhblk0a9639btq2hd",
              members: [
                {
                  id: "cji6gz8gwhbll0a96aahx3ivv",
                  order: 1,
                  pokemon: {
                    name: "bulbasaur",
                    pokedexId: 1,
                    sprite: "1.png",
                    types: ["POISON", "GRASS"]
                  }
                },
                {
                  id: "cji6gz8gwhblm0a96eja18t10",
                  order: 2,
                  pokemon: {
                    name: "charmander",
                    pokedexId: 4,
                    sprite: "4.png",
                    types: ["FIRE"]
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
                    types: ["WATER"]
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
                    types: ["ELECTRIC"]
                  }
                }
              ],
              name: "Starters Team"
            }
          }
        }
      }
    ];
    const team = mocksWithTeam[2].result.data.teamById;
    const { getByValue, queryByValue, queryAllByTestId, queryByText } = render(
      <MockedProvider mocks={mocksWithTeam} addTypename={false}>
        <TeamBuilderContainer query={{ teamId: team.id }} />
      </MockedProvider>
    );

    await wait(0);

    getByValue(team.name);
    expect(queryByValue(team.name)).toBeTruthy();
    expect(queryAllByTestId(/pokemon-(\w+)/)).toHaveLength(team.members.length);
    expect(queryByText(/Save team/)).toBeTruthy();
  });
});
