// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
import TeamView from ".";
import { TeamMember } from "../../types";
import { getPokemon } from "../../queries/pokemon";

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: getPokemon
    },
    result: {
      data: {
        pokemon: [
          {
            __typename: "Pokemon",
            id: "4",
            name: "charmander",
            pokedexId: 4,
            sprite: "4.png",
            types: [{ name: "FIRE" }],
            moves: [
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  types: [
                    {
                      __typename: "Type",
                      name: "Normal",
                      slug: "normal"
                    }
                  ],
                  name: "substitute"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  types: [
                    {
                      __typename: "Move",
                      name: "Normal",
                      slug: "normal"
                    }
                  ],
                  name: "slash"
                },
                levelLearnedAt: 30,
                learnMethod: "level-up"
              },
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  types: [
                    {
                      __typename: "Type",
                      name: "Psychic",
                      slug: "psychic"
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
            __typename: "Pokemon",
            id: "25",
            name: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: [{ __typename: "Type", name: "Electric", slug: "electric" }],
            moves: [
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  types: [
                    {
                      __typename: "Type",
                      name: "Normal",
                      slug: "normal"
                    }
                  ],
                  name: "substitute"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  types: [
                    {
                      __typename: "Type",
                      name: "Psychic",
                      slug: "psychic"
                    }
                  ],
                  name: "rest"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  types: [
                    {
                      __typename: "Type",
                      name: "Normal",
                      slug: "normal"
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
            __typename: "Pokemon",
            id: "93",
            name: "haunter",
            pokedexId: 93,
            sprite: "93.png",
            types: [
              { __typename: "Type", name: "Ghost", slug: "ghost" },
              { __typename: "Type", name: "Poison", slug: "poison" }
            ],
            moves: [
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  types: [
                    {
                      __typename: "Type",
                      name: "Normal",
                      slug: "normal"
                    }
                  ],
                  name: "substitute"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  types: [
                    {
                      __typename: "Type",
                      name: "Psychic",
                      slug: "psychic"
                    }
                  ],
                  name: "rest"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  types: [
                    {
                      __typename: "Type",
                      name: "Normal",
                      slug: "normal"
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

storiesOf("TeamView", module).add("default", () => (
  <MockedProvider mocks={mocks}>
    <TeamView
      teamMembers={threeTeamMembers}
      addPokemonToTeam={action("team-view-add")}
      removePokemonFromTeam={action("team-view-remove")}
      reorderTeamMembers={action("team-view-reorder")}
      currentSearchPokemon={threeTeamMembers[0].pokemon}
    />
  </MockedProvider>
));
