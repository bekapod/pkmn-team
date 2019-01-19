import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { fireEvent, render } from "react-testing-library";
import TeamBuilder from ".";
import { renderWithRouter } from "../../helpers/testUtils";
import { ITeam, ITeamMember } from "../../types";

jest.mock("../../containers/TeamView", () => () => (
  <div data-testid="mocked-TeamView" />
));

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
          <TeamBuilder
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
          />
        );

        const input = getByLabelText(/Choose a team name/) as HTMLInputElement;

        expect(input.value).toBe("");
      });
    });

    describe("when user has set a team name", () => {
      it("displays team name in team name input", () => {
        const fnStub = () => null;
        const { getByLabelText } = render(
          <TeamBuilder
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            teamBuilderName="My Team"
          />
        );

        const input = getByLabelText(/Choose a team name/) as HTMLInputElement;

        expect(input.value).toBe("My Team");
      });

      it("calls setTeamName when user enters a team name", () => {
        const fnStub = () => null;
        const setTeamName = jest.fn();
        const { getByPlaceholderText } = render(
          <TeamBuilder
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={setTeamName}
            setTeamMembers={fnStub}
            teamBuilderMembers={threeTeamMembers}
          />
        );

        expect(setTeamName).toBeCalledTimes(1);

        fireEvent.change(getByPlaceholderText(/Choose a team name/), {
          target: { value: "My Team Name" }
        });

        expect(setTeamName).toBeCalledTimes(2);
        expect(setTeamName).toHaveBeenCalledWith("My Team Name");
      });
    });

    describe("when user attempts to submit form", () => {
      it("displays an error message for invalid team name when user has not entered a team name", () => {
        const fnStub = () => null;
        const { getByText, queryByText } = render(
          <TeamBuilder
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            teamBuilderMembers={threeTeamMembers}
          />
        );

        expect(queryByText(/Team name is required/)).toBeFalsy();

        fireEvent.click(getByText(/Create this team!/));

        expect(queryByText(/Team name is required/)).toBeTruthy();
      });

      it("displays a loading spinner when create is in progress", () => {
        const fnStub = () => null;
        const { queryByTestId } = render(
          <TeamBuilder
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            teamBuilderMembers={threeTeamMembers}
            loading={true}
          />
        );

        expect(queryByTestId("loading-spinner")).toBeTruthy();
      });

      it("displays an error message if create team failed", () => {
        const fnStub = () => null;
        const { queryByText } = render(
          <TeamBuilder
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            teamBuilderMembers={threeTeamMembers}
            error={{
              extraInfo: null,
              graphQLErrors: [],
              message: "An error happened.",
              name: "",
              networkError: null
            }}
          />
        );

        expect(queryByText(/An error happened./)).toBeTruthy();
      });

      it("calls createTeamMutation when user submits team creation form with valid data", () => {
        const fnStub = () => null;
        const mutation = jest.fn();
        const { getByText } = render(
          <TeamBuilder
            updateTeamMutation={fnStub}
            createTeamMutation={mutation}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            teamBuilderMembers={threeTeamMembers}
            teamBuilderName="My Team"
          />
        );

        expect(mutation).toBeCalledTimes(0);

        fireEvent.click(getByText(/Create this team!/));

        expect(mutation).toBeCalledTimes(1);
        expect(mutation).toHaveBeenCalledWith({
          variables: {
            name: "My Team",
            pokedexIds: [4, 25, 93]
          }
        });
      });

      it("does not call createTeamMutation when user submits team creation form with invalid data, and scrolls user to top of the page", () => {
        const fnStub = () => null;
        const mutation = jest.fn();
        const scrollToTop = jest.fn();
        const { getByText } = render(
          <TeamBuilder
            updateTeamMutation={fnStub}
            createTeamMutation={mutation}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            scrollToTop={scrollToTop}
            teamBuilderMembers={threeTeamMembers}
          />
        );

        expect(mutation).toBeCalledTimes(0);
        expect(scrollToTop).toBeCalledTimes(0);

        fireEvent.click(getByText(/Create this team!/));

        expect(mutation).toBeCalledTimes(0);
        expect(scrollToTop).toBeCalledTimes(1);
      });
    });

    describe("when team has been successfully created", () => {
      it("redirects to team edit form", async () => {
        const fnStub = () => null;
        const { finishLoading, history } = renderWithRouter(
          <TeamBuilder
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            createdTeamId="34242"
          />,
          { route: "/team/create/", waitForText: "Save team" }
        );

        await finishLoading;

        expect(
          history.entries.find(entry => entry.pathname === "/team/edit/34242")
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
      it("calls setTeamName and setTeamMembers", () => {
        const fnStub = () => null;
        const setTeamName = jest.fn();
        const setTeamMembers = jest.fn();
        render(
          <TeamBuilder
            team={team}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={setTeamName}
            setTeamMembers={setTeamMembers}
          />
        );

        expect(setTeamName).toBeCalledWith(team.name);
        expect(setTeamMembers).toBeCalledWith(team.members);
      });
    });

    describe("when user attempts to submit form", () => {
      it("displays an error message for invalid team name when user has not entered a team name", () => {
        const fnStub = () => null;
        const { getByText, queryByText } = render(
          <TeamBuilder
            team={team}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            teamBuilderMembers={threeTeamMembers}
          />
        );

        expect(queryByText(/Team name is required/)).toBeFalsy();

        fireEvent.click(getByText(/Save team/));

        expect(queryByText(/Team name is required/)).toBeTruthy();
      });

      it("calls updateTeamMutation when user submits team edit form with valid data", () => {
        const fnStub = () => null;
        const mutation = jest.fn();
        const { getByText } = render(
          <TeamBuilder
            team={team}
            updateTeamMutation={mutation}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            teamBuilderMembers={threeTeamMembers}
            teamBuilderName="My Team"
          />
        );

        expect(mutation).toBeCalledTimes(0);

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
        const { getByText } = render(
          <TeamBuilder
            team={team}
            updateTeamMutation={mutation}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            scrollToTop={scrollToTop}
            teamBuilderMembers={threeTeamMembers}
          />
        );

        expect(mutation).toBeCalledTimes(0);
        expect(scrollToTop).toBeCalledTimes(0);

        fireEvent.click(getByText(/Save team/));

        expect(mutation).toBeCalledTimes(0);
        expect(scrollToTop).toBeCalledTimes(1);
      });
    });
  });
});
