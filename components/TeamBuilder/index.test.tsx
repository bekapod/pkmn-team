import React from "react";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
import { fireEvent, render } from "react-testing-library";
import wait from "waait";
import TeamBuilder from ".";
import { getPokemon } from "../../queries/pokemon";
import { Team, TeamMember } from "../../types";

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
            types: [{ __typename: "Type", name: "Fire", slug: "fire" }]
          },
          {
            __typename: "Pokemon",
            id: "25",
            name: "Pikachu",
            slug: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: [{ __typename: "Type", name: "Electric", slug: "electric" }]
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
            ]
          }
        ]
      },
      loading: false
    }
  }
];

describe("<TeamBuilder />", () => {
  const threeTeamMembers: TeamMember[] = [
    {
      id: "1",
      order: 1,
      pokemon: {
        id: "4",
        name: "Charmander",
        slug: "charmander",
        pokedexId: 4,
        sprite: "4.png",
        types: [{ name: "Fire", slug: "fire" }]
      }
    },
    {
      id: "2",
      order: 2,
      pokemon: {
        id: "25",
        name: "Pikachu",
        slug: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: [{ name: "Electric", slug: "electric" }]
      }
    },
    {
      id: "3",
      order: 3,
      pokemon: {
        id: "93",
        name: "Haunter",
        slug: "haunter",
        pokedexId: 93,
        sprite: "93.png",
        types: [
          { name: "Ghost", slug: "ghost" },
          { name: "Poison", slug: "poison" }
        ]
      }
    }
  ];

  describe("when creating a team", () => {
    describe("when user has not entered any information", () => {
      it("displays empty team name input", () => {
        const fnStub = (): null => null;
        const { getByLabelText } = render(
          <MockedProvider mocks={mocks}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
              deleteTeamMutation={fnStub}
            />
          </MockedProvider>
        );

        const input = getByLabelText(/Choose a team name/) as HTMLInputElement;

        expect(input.value).toBe("");
      });
    });

    describe("when user attempts to submit form", () => {
      it("displays an error message for invalid team name when user has not entered a team name", async () => {
        const fnStub = (): null => null;
        const { getByText, queryByText } = render(
          <MockedProvider mocks={mocks}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
              deleteTeamMutation={fnStub}
              currentSearchPokemon={threeTeamMembers[0].pokemon}
            />
          </MockedProvider>
        );

        await wait(0);

        expect(queryByText(/Team name is required/)).toBeFalsy();

        fireEvent.click(getByText(/Add Charmander to team/));
        fireEvent.click(getByText(/Save team/));

        await wait(0);

        expect(queryByText(/You should give your team a name./)).toBeTruthy();
      });

      it("displays a loading spinner when create is in progress", () => {
        const fnStub = (): null => null;
        const { queryByTestId } = render(
          <MockedProvider mocks={mocks}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
              deleteTeamMutation={fnStub}
              loading
            />
          </MockedProvider>
        );

        expect(queryByTestId("loading-spinner")).toBeTruthy();
      });

      it("displays an error message if create team failed", () => {
        const fnStub = (): null => null;
        const { queryByText } = render(
          <MockedProvider mocks={mocks}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
              deleteTeamMutation={fnStub}
              error={{
                extraInfo: null,
                graphQLErrors: [],
                message: "An error happened.",
                name: "",
                networkError: null
              }}
            />
          </MockedProvider>
        );

        expect(queryByText(/An error happened./)).toBeTruthy();
      });

      it("calls createTeamMutation when user enters a team name", async () => {
        const fnStub = (): null => null;
        const mutation = jest.fn();
        const { getByLabelText } = render(
          <MockedProvider mocks={mocks}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={mutation}
              deleteTeamMutation={fnStub}
              currentSearchPokemon={threeTeamMembers[0].pokemon}
            />
          </MockedProvider>
        );

        expect(mutation).toBeCalledTimes(0);

        fireEvent.change(getByLabelText(/Choose a team name/), {
          target: { value: "My Team" }
        });
        fireEvent.blur(getByLabelText(/Choose a team name/));

        await wait(0);

        expect(mutation).toBeCalledTimes(1);
        expect(mutation).toHaveBeenCalledWith({
          variables: {
            team: {
              id: "",
              name: "My Team",
              members: []
            }
          }
        });
      });

      it("does not call createTeamMutation when user submits team creation form with invalid data", async () => {
        const fnStub = (): null => null;
        const mutation = jest.fn();
        const { getByText } = render(
          <MockedProvider mocks={mocks}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={mutation}
              deleteTeamMutation={fnStub}
              currentSearchPokemon={threeTeamMembers[0].pokemon}
            />
          </MockedProvider>
        );

        expect(mutation).toBeCalledTimes(0);

        fireEvent.click(getByText(/Add Charmander to team/));
        fireEvent.click(getByText(/Save team/));

        await wait(0);

        expect(mutation).toBeCalledTimes(0);
      });
    });

    describe("when team has been successfully created", () => {
      it("redirects to team edit form", async () => {
        const fnStub = (): null => null;
        render(
          <MockedProvider mocks={mocks}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
              deleteTeamMutation={fnStub}
              createdTeamId="34242"
            />
          </MockedProvider>
        );

        await wait(0);

        expect(
          global.appHistory.find(entry => entry === "/team/edit/34242")
        ).toBeTruthy();
      });
    });
  });

  describe("when editing a team", () => {
    const team: Team = {
      createdAt: "2018-06-08T21:15:14.723Z",
      id: "cji6gz8gwhblk0a9639btq2hd",
      members: [
        {
          id: "cji6gz8gwhbll0a96aahx3ivv",
          order: 1,
          pokemon: {
            id: "1",
            name: "Bulbasaur",
            slug: "bulbasaur",
            pokedexId: 1,
            sprite: "1.png",
            types: [
              { name: "Poison", slug: "poison" },
              { name: "Grass", slug: "grass" }
            ]
          }
        },
        {
          id: "cji6gz8gwhblm0a96eja18t10",
          order: 2,
          pokemon: {
            id: "4",
            name: "Charmander",
            slug: "charmander",
            pokedexId: 4,
            sprite: "4.png",
            types: [{ name: "Fire", slug: "fire" }]
          }
        },
        {
          id: "cji6gz8gwhbln0a96q7wmx9zj",
          order: 3,
          pokemon: {
            id: "7",
            name: "Squirtle",
            slug: "squirtle",
            pokedexId: 7,
            sprite: "7.png",
            types: [{ name: "Water", slug: "water" }]
          }
        },
        {
          id: "cji6gz8gwhblo0a96wgoki379",
          order: 4,
          pokemon: {
            id: "25",
            name: "Pikachu",
            slug: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: [{ name: "Electric", slug: "electric" }]
          }
        }
      ],
      name: "Starters Team"
    };

    describe("when user's team is found", () => {
      it("renders team name and members", () => {
        const fnStub = (): null => null;
        const { getByValue, getByTestId } = render(
          <MockedProvider mocks={mocks}>
            <TeamBuilder
              team={team}
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
              deleteTeamMutation={fnStub}
            />
          </MockedProvider>
        );

        expect(getByValue(/Starters Team/)).toBeTruthy();
        expect(getByTestId("tab-item-cji6gz8gwhbll0a96aahx3ivv")).toBeTruthy();
        expect(getByTestId("tab-item-cji6gz8gwhblm0a96eja18t10")).toBeTruthy();
        expect(getByTestId("tab-item-cji6gz8gwhbln0a96q7wmx9zj")).toBeTruthy();
        expect(getByTestId("tab-item-cji6gz8gwhblo0a96wgoki379")).toBeTruthy();
      });
    });

    describe("when user attempts to submit form", () => {
      it("displays an error message for invalid team name when user has not entered a team name", async () => {
        const fnStub = (): null => null;
        const { getByLabelText, queryByText } = render(
          <MockedProvider mocks={mocks}>
            <TeamBuilder
              team={team}
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
              deleteTeamMutation={fnStub}
            />
          </MockedProvider>
        );

        expect(queryByText(/You should give your team a name/)).toBeFalsy();

        fireEvent.change(getByLabelText(/Choose a team name/), {
          target: { value: "" }
        });
        fireEvent.blur(getByLabelText(/Choose a team name/));

        await wait(0);

        expect(queryByText(/You should give your team a name/)).toBeTruthy();
      });

      it("calls updateTeamMutation when user submits team edit form with valid data", async () => {
        const fnStub = (): null => null;
        const mutation = jest.fn();
        const { getByLabelText } = render(
          <MockedProvider mocks={mocks}>
            <TeamBuilder
              team={team}
              updateTeamMutation={mutation}
              createTeamMutation={fnStub}
              deleteTeamMutation={fnStub}
              currentSearchPokemon={threeTeamMembers[2].pokemon}
            />
          </MockedProvider>
        );

        expect(mutation).toBeCalledTimes(0);

        fireEvent.change(getByLabelText(/Choose a team name/), {
          target: { value: "My Team" }
        });
        fireEvent.blur(getByLabelText(/Choose a team name/));

        await wait(0);

        expect(mutation).toBeCalledTimes(1);
        expect(mutation).toHaveBeenCalledWith({
          optimisticResponse: expect.any(Object),
          variables: {
            team: {
              id: team.id,
              name: "My Team",
              members: [
                {
                  id: team.members[0].id,
                  order: team.members[0].order,
                  pokemonId: team.members[0].pokemon.id
                },
                {
                  id: team.members[1].id,
                  order: team.members[1].order,
                  pokemonId: team.members[1].pokemon.id
                },
                {
                  id: team.members[2].id,
                  order: team.members[2].order,
                  pokemonId: team.members[2].pokemon.id
                },
                {
                  id: team.members[3].id,
                  order: team.members[3].order,
                  pokemonId: team.members[3].pokemon.id
                }
              ]
            }
          }
        });
      });

      it("does not call updateTeamMutation when user submits team edit form with invalid data", async () => {
        const fnStub = (): null => null;
        const mutation = jest.fn();
        const { getByLabelText } = render(
          <MockedProvider mocks={mocks}>
            <TeamBuilder
              team={team}
              updateTeamMutation={mutation}
              createTeamMutation={fnStub}
              deleteTeamMutation={fnStub}
            />
          </MockedProvider>
        );

        expect(mutation).toBeCalledTimes(0);

        fireEvent.change(getByLabelText(/Choose a team name/), {
          target: { value: "" }
        });
        fireEvent.blur(getByLabelText(/Choose a team name/));

        await wait(0);

        expect(mutation).toBeCalledTimes(0);
      });

      it("calls deleteTeamMutation when delete team button is clicked", async () => {
        const fnStub = (): null => null;
        const mutation = jest.fn();
        const { getByText } = render(
          <MockedProvider mocks={mocks}>
            <TeamBuilder
              team={team}
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
              deleteTeamMutation={mutation}
            />
          </MockedProvider>
        );

        expect(mutation).toBeCalledTimes(0);

        fireEvent.click(getByText(/Delete team/));

        await wait(0);

        expect(mutation).toBeCalledTimes(1);
      });
    });
  });

  describe("when team has been successfully deleted", () => {
    it("redirects to dashboard", async () => {
      const fnStub = (): null => null;
      render(
        <MockedProvider mocks={mocks}>
          <TeamBuilder
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            deleteTeamMutation={fnStub}
            deletedTeamId="34242"
          />
        </MockedProvider>
      );

      await wait(0);

      expect(global.appHistory.find(entry => entry === "/")).toBeTruthy();
    });
  });
});
