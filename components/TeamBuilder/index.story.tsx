// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from "@storybook/react";
import React from "react";
import { action } from "@storybook/addon-actions";
import { MockedResponse } from "react-apollo/test-links";
import { MockedProvider } from "react-apollo/test-utils";
import TeamBuilder from ".";
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
            __typename: "Pokemon",
            id: "4",
            name: "Charmander",
            slug: "charmander",
            pokedexId: 4,
            sprite: "4.png",
            types: [{ __typename: "Type", name: "Fire", slug: "fire" }],
            moves: [
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  type: {
                    __typename: "Type",
                    name: "Normal",
                    slug: "normal"
                  },
                  name: "Substitute",
                  slug: "substitute"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  type: {
                    __typename: "Move",
                    name: "Normal",
                    slug: "normal"
                  },
                  name: "Slash",
                  slug: "slash"
                },
                levelLearnedAt: 30,
                learnMethod: "level-up"
              },
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  type: {
                    __typename: "Type",
                    name: "Psychic",
                    slug: "psychic"
                  },
                  name: "Rest",
                  slug: "rest"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              }
            ]
          },
          {
            __typename: "Pokemon",
            id: "25",
            name: "Pikachu",
            slug: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: [{ __typename: "Type", name: "Electric", slug: "electric" }],
            moves: [
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  type: {
                    __typename: "Type",
                    name: "Normal",
                    slug: "normal"
                  },
                  name: "Substitute",
                  slug: "substitute"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  type: {
                    __typename: "Type",
                    name: "Psychic",
                    slug: "psychic"
                  },
                  name: "Rest",
                  slug: "rest"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  type: {
                    __typename: "Type",
                    name: "Normal",
                    slug: "normal"
                  },
                  name: "Flash",
                  slug: "flash"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              }
            ]
          },
          {
            __typename: "Pokemon",
            id: "93",
            name: "Haunter",
            slug: "haunter",
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
                  type: {
                    __typename: "Type",
                    name: "Normal",
                    slug: "normal"
                  },
                  name: "Substitute",
                  slug: "substitute"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  type: {
                    __typename: "Type",
                    name: "Psychic",
                    slug: "psychic"
                  },
                  name: "Rest",
                  slug: "rest"
                },
                levelLearnedAt: 0,
                learnMethod: "machine"
              },
              {
                __typename: "PokemonMove",
                version: "yellow",
                move: {
                  __typename: "Move",
                  type: {
                    __typename: "Type",
                    name: "Normal",
                    slug: "normal"
                  },
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

const team: Team = {
  createdAt: "2018-06-08T21:15:14.723Z",
  id: "cji6gz8gwhblk0a9639btq2hd",
  members: threeTeamMembers,
  name: "Starters Team"
};

storiesOf("TeamBuilder", module)
  .add("with empty state", () => (
    <MockedProvider mocks={mocks}>
      <TeamBuilder
        updateTeamMutation={action("team-builder-update")}
        createTeamMutation={action("team-builder-create")}
        deleteTeamMutation={action("team-builder-delete")}
        currentSearchPokemon={threeTeamMembers[0].pokemon}
      />
    </MockedProvider>
  ))
  .add("with team state", () => (
    <MockedProvider mocks={mocks}>
      <TeamBuilder
        team={team}
        updateTeamMutation={action("team-builder-update")}
        createTeamMutation={action("team-builder-create")}
        deleteTeamMutation={action("team-builder-delete")}
        currentSearchPokemon={threeTeamMembers[0].pokemon}
      />
    </MockedProvider>
  ));
