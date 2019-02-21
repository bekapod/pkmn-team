import React from "react";
import { MockedProvider, MockedResponse } from "react-apollo/test-utils";
// tslint:disable-next-line:no-implicit-dependencies
import { fireEvent, render } from "react-testing-library";
import wait from "waait";
import TeamBuilder from ".";
import { getAllPokemon } from "../../queries/pokemon";
import { ITeam, ITeamMember } from "../../types";

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: getAllPokemon
    },
    result: {
      data: {
        allPokemon: [
          {
            id: "4",
            name: "charmander",
            pokedexId: 4,
            sprite: "4.png",
            types: ["FIRE"]
          },
          {
            id: "25",
            name: "pikachu",
            pokedexId: 25,
            sprite: "25.png",
            types: ["ELECTRIC"]
          },
          {
            id: "93",
            name: "haunter",
            pokedexId: 93,
            sprite: "93.png",
            types: ["GHOST", "POISON"]
          }
        ]
      },
      loading: false
    }
  }
];

describe("<TeamBuilder />", () => {
  const threeTeamMembers: ITeamMember[] = [
    {
      id: "1",
      pokemon: {
        id: "4",
        name: "charmander",
        pokedexId: 4,
        sprite: "4.png",
        types: ["FIRE"]
      }
    },
    {
      id: "2",
      pokemon: {
        id: "25",
        name: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: ["ELECTRIC"]
      }
    },
    {
      id: "3",
      pokemon: {
        id: "93",
        name: "haunter",
        pokedexId: 93,
        sprite: "93.png",
        types: ["GHOST", "POISON"]
      }
    }
  ];

  describe("when creating a team", () => {
    describe("when user has not entered any information", () => {
      it("displays empty team name input", () => {
        const fnStub = () => null;
        const { getByLabelText } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
            />
          </MockedProvider>
        );

        const input = getByLabelText(/Choose a team name/) as HTMLInputElement;

        expect(input.value).toBe("");
      });
    });

    describe("when user attempts to submit form", () => {
      it("displays an error message for invalid team name when user has not entered a team name", async () => {
        const fnStub = () => null;
        const { getByText, queryByText } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
              currentSearchPokemon={threeTeamMembers[0].pokemon}
            />
          </MockedProvider>
        );

        await wait(0);

        expect(queryByText(/Team name is required/)).toBeFalsy();

        fireEvent.click(getByText(/Add charmander to team/));
        fireEvent.click(getByText(/Create this team!/));

        expect(queryByText(/Team name is required/)).toBeTruthy();
      });

      it("displays a loading spinner when create is in progress", () => {
        const fnStub = () => null;
        const { queryByTestId } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
              loading={true}
            />
          </MockedProvider>
        );

        expect(queryByTestId("loading-spinner")).toBeTruthy();
      });

      it("displays an error message if create team failed", () => {
        const fnStub = () => null;
        const { queryByText } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
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

      it("calls createTeamMutation when user submits team creation form with valid data", () => {
        const fnStub = () => null;
        const mutation = jest.fn();
        const { getByText, getByLabelText } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={mutation}
              currentSearchPokemon={threeTeamMembers[0].pokemon}
            />
          </MockedProvider>
        );

        expect(mutation).toBeCalledTimes(0);

        fireEvent.click(getByText(/Add charmander to team/));
        fireEvent.change(getByLabelText(/Choose a team name/), {
          target: { value: "My Team" }
        });
        fireEvent.click(getByText(/Create this team!/));

        expect(mutation).toBeCalledTimes(1);
        expect(mutation).toHaveBeenCalledWith({
          variables: {
            name: "My Team",
            pokedexIds: [4]
          }
        });
      });

      it("does not call createTeamMutation when user submits team creation form with invalid data, and scrolls user to top of the page", () => {
        const fnStub = () => null;
        const mutation = jest.fn();
        const scrollToTop = jest.fn();
        const { getByText } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={mutation}
              scrollToTop={scrollToTop}
              currentSearchPokemon={threeTeamMembers[0].pokemon}
            />
          </MockedProvider>
        );

        expect(mutation).toBeCalledTimes(0);
        expect(scrollToTop).toBeCalledTimes(0);

        fireEvent.click(getByText(/Add charmander to team/));
        fireEvent.click(getByText(/Create this team!/));

        expect(mutation).toBeCalledTimes(0);
        expect(scrollToTop).toBeCalledTimes(1);
      });
    });

    describe("when team has been successfully created", () => {
      it("redirects to team edit form", async () => {
        const fnStub = () => null;
        render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <TeamBuilder
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
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
    const team: ITeam = {
      createdAt: "2018-06-08T21:15:14.723Z",
      id: "cji6gz8gwhblk0a9639btq2hd",
      members: [
        {
          id: "cji6gz8gwhbll0a96aahx3ivv",
          pokemon: {
            id: "1",
            name: "bulbasaur",
            pokedexId: 1,
            sprite: "1.png",
            types: ["POISON", "GRASS"]
          }
        },
        {
          id: "cji6gz8gwhblm0a96eja18t10",
          pokemon: {
            id: "4",
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
    };

    describe("when user's team is found", () => {
      it("renders team name and members", () => {
        const fnStub = () => null;
        const { getByValue, getByTestId } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <TeamBuilder
              team={team}
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
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
      it("displays an error message for invalid team name when user has not entered a team name", () => {
        const fnStub = () => null;
        const { getByText, getByValue, queryByText } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <TeamBuilder
              team={team}
              updateTeamMutation={fnStub}
              createTeamMutation={fnStub}
            />
          </MockedProvider>
        );

        expect(queryByText(/Team name is required/)).toBeFalsy();

        fireEvent.change(getByValue(/Starters Team/), {
          target: { value: "" }
        });
        fireEvent.click(getByText(/Save team/));

        expect(queryByText(/Team name is required/)).toBeTruthy();
      });

      it("calls updateTeamMutation when user submits team edit form with valid data", () => {
        const fnStub = () => null;
        const mutation = jest.fn();
        const { getByText, getByValue } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <TeamBuilder
              team={team}
              updateTeamMutation={mutation}
              createTeamMutation={fnStub}
              currentSearchPokemon={threeTeamMembers[2].pokemon}
            />
          </MockedProvider>
        );

        expect(mutation).toBeCalledTimes(0);

        fireEvent.click(getByText(/Remove bulbasaur from team/));
        fireEvent.click(getByText(/Remove squirtle from team/));
        fireEvent.click(getByText(/Add haunter to team/));
        fireEvent.change(getByValue(/Starters Team/), {
          target: { value: "My Team" }
        });
        fireEvent.click(getByText(/Save team/));

        expect(mutation).toBeCalledTimes(1);
        expect(mutation).toHaveBeenCalledWith({
          variables: {
            id: team.id,
            name: "My Team",
            pokedexIds: [4, 25, 93]
          }
        });
      });

      it("does not call updateTeamMutation when user submits team edit form with invalid data, and scrolls user to top of the page", () => {
        const fnStub = () => null;
        const mutation = jest.fn();
        const scrollToTop = jest.fn();
        const { getByText, getByValue } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <TeamBuilder
              team={team}
              updateTeamMutation={mutation}
              createTeamMutation={fnStub}
              scrollToTop={scrollToTop}
            />
          </MockedProvider>
        );

        expect(mutation).toBeCalledTimes(0);
        expect(scrollToTop).toBeCalledTimes(0);

        fireEvent.change(getByValue(/Starters Team/), {
          target: { value: "" }
        });
        fireEvent.click(getByText(/Save team/));

        expect(mutation).toBeCalledTimes(0);
        expect(scrollToTop).toBeCalledTimes(1);
      });
    });
  });
});
