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
            id: "4",
            name: "Charmander",
            slug: "charmander",
            pokedexId: 4,
            sprite: "4.png",
            types: [{ name: "Fire", slug: "fire" }],
            moves: [
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "Normal",
                      slug: "normal"
                    }
                  ],
                  name: "Substitute",
                  slug: "substitute"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "Normal",
                      slug: "normal"
                    }
                  ],
                  name: "Slash",
                  slug: "slash"
                },
                levelLearnedAt: 30,
                learnMethod: "level-up"
              },
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "Psychic",
                      slug: "psychic"
                    }
                  ],
                  name: "Rest",
                  slug: "rest"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              }
            ]
          },
          {
            id: "25",
            name: "Pikachu",
            slug: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: [{ name: "Electric", slug: "electric" }],
            moves: [
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "Normal",
                      slug: "normal"
                    }
                  ],
                  name: "Substitute",
                  slug: "substitute"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "Psychic",
                      slug: "psychic"
                    }
                  ],
                  name: "Rest",
                  slug: "rest"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "Normal",
                      slug: "normal"
                    }
                  ],
                  name: "Flash",
                  slug: "flash"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              }
            ]
          },
          {
            id: "93",
            name: "Haunter",
            slug: "haunter",
            pokedexId: 93,
            sprite: "93.png",
            types: [
              { name: "Ghost", slug: "ghost" },
              { name: "Poison", slug: "poison" }
            ],
            moves: [
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "Normal",
                      slug: "normal"
                    }
                  ],
                  name: "Substitute",
                  slug: "substitute"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "Psychic",
                      slug: "psychic"
                    }
                  ],
                  name: "Rest",
                  slug: "rest"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                version: "yellow",
                move: {
                  types: [
                    {
                      name: "Normal",
                      slug: "normal"
                    }
                  ],
                  name: "Explosion",
                  slug: "explosion"
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
  <MockedProvider mocks={mocks} addTypename={false}>
    <TeamView
      teamMembers={threeTeamMembers}
      addPokemonToTeam={action("team-view-add")}
      removePokemonFromTeam={action("team-view-remove")}
      reorderTeamMembers={action("team-view-reorder")}
      currentSearchPokemon={threeTeamMembers[0].pokemon}
    />
  </MockedProvider>
));
