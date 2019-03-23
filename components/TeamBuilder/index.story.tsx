// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import TeamBuilder from ".";
import { action } from "@storybook/addon-actions";
import { MockedResponse } from "react-apollo/test-links";
import { MockedProvider } from "react-apollo/test-utils";
import { getPokemon } from "../../queries/pokemon";
import { TeamMember, Team } from "../../types";

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: getPokemon
    },
    result: {
      data: {
        pokemon: [
          {
            id: "4",
            name: "charmander",
            pokedexId: 4,
            sprite: "4.png",
            types: [{ name: "FIRE" }],
            moves: [
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "normal"
                    }
                  ],
                  name: "substitute"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "normal"
                    }
                  ],
                  name: "slash"
                },
                levelLearnedAt: 30,
                learnMethod: "level-up"
              },
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "psychic"
                    }
                  ],
                  name: "rest"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              }
            ]
          },
          {
            id: "25",
            name: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: [{ name: "ELECTRIC" }],
            moves: [
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "normal"
                    }
                  ],
                  name: "substitute"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "psychic"
                    }
                  ],
                  name: "rest"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "normal"
                    }
                  ],
                  name: "flash"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              }
            ]
          },
          {
            id: "93",
            name: "haunter",
            pokedexId: 93,
            sprite: "93.png",
            types: [{ name: "GHOST" }, { name: "POISON" }],
            moves: [
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "normal"
                    }
                  ],
                  name: "substitute"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "psychic"
                    }
                  ],
                  name: "rest"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "normal"
                    }
                  ],
                  name: "explosion"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              }
            ]
          }
        ]
      },
      loading: false
    }
  }
];

const threeTeamMembers: TeamMember[] = [
  {
    id: "1",
    order: 1,
    pokemon: mocks[0].result.data.pokemon[0]
  },
  {
    id: "2",
    order: 2,
    pokemon: mocks[0].result.data.pokemon[1]
  },
  {
    id: "3",
    order: 3,
    pokemon: mocks[0].result.data.pokemon[2]
  }
];

const team: Team = {
  insertedAt: "2018-06-08T21:15:14.723Z",
  id: "cji6gz8gwhblk0a9639btq2hd",
  members: threeTeamMembers,
  name: "Starters Team"
};

storiesOf("TeamBuilder", module)
  .add("with empty state", () => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <TeamBuilder
        updateTeamMutation={action("team-builder-update")}
        createTeamMutation={action("team-builder-create")}
        deleteTeamMutation={action("team-builder-delete")}
        currentSearchPokemon={threeTeamMembers[0].pokemon}
      />
    </MockedProvider>
  ))
  .add("with team state", () => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <TeamBuilder
        team={team}
        updateTeamMutation={action("team-builder-update")}
        createTeamMutation={action("team-builder-create")}
        deleteTeamMutation={action("team-builder-delete")}
        currentSearchPokemon={threeTeamMembers[0].pokemon}
      />
    </MockedProvider>
  ));
