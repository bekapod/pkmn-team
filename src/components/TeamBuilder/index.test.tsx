import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { fireEvent, render } from "react-testing-library";
import TeamBuilder from ".";
import { renderWithRouter } from "../../helpers/testUtils";
import { IPokemon, ITeam, ITeamMember } from "../../types";

describe("<TeamBuilder />", () => {
  const pokemon: IPokemon[] = [
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
  ];

  const threeTeamMembers: { [key: string]: ITeamMember } = {
    "1": {
      id: "1",
      pokemon: {
        id: "4",
        name: "charmander",
        pokedexId: 4,
        sprite: "4.png",
        types: ["FIRE"]
      }
    },
    "2": {
      id: "2",
      pokemon: {
        id: "25",
        name: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: ["ELECTRIC"]
      }
    },
    "3": {
      id: "3",
      pokemon: {
        id: "93",
        name: "haunter",
        pokedexId: 93,
        sprite: "93.png",
        types: ["GHOST", "POISON"]
      }
    }
  };

  const sixTeamMembers: { [key: string]: ITeamMember } = {
    "1": {
      id: "1",
      pokemon: {
        id: "4",
        name: "charmander",
        pokedexId: 4,
        sprite: "4.png",
        types: ["FIRE"]
      }
    },
    "2": {
      id: "2",
      pokemon: {
        id: "25",
        name: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: ["ELECTRIC"]
      }
    },
    "3": {
      id: "3",
      pokemon: {
        id: "93",
        name: "haunter",
        pokedexId: 93,
        sprite: "93.png",
        types: ["GHOST", "POISON"]
      }
    },
    "4": {
      id: "1",
      pokemon: {
        id: "4",
        name: "charmander",
        pokedexId: 4,
        sprite: "4.png",
        types: ["FIRE"]
      }
    },
    "5": {
      id: "2",
      pokemon: {
        id: "25",
        name: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: ["ELECTRIC"]
      }
    },
    "6": {
      id: "3",
      pokemon: {
        id: "93",
        name: "haunter",
        pokedexId: 93,
        sprite: "93.png",
        types: ["GHOST", "POISON"]
      }
    }
  };

  describe("when creating a team", () => {
    describe("when user has not entered any information", () => {
      it("displays no team members and empty team name input", () => {
        const fnStub = () => null;
        const { getByLabelText, queryAllByTestId } = render(
          <TeamBuilder
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
          />
        );

        const input = getByLabelText(/Choose a team name/) as HTMLInputElement;
        const teamMembers = queryAllByTestId(/pokemon-(\w+)/);

        expect(input.value).toBe("");
        expect(teamMembers).toHaveLength(0);
      });
    });

    describe("when user has set a team name", () => {
      it("displays team name in team name input", () => {
        const fnStub = () => null;
        const { getByLabelText } = render(
          <TeamBuilder
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
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
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={setTeamName}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
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

    describe("when user has added team members", () => {
      it("displays correct number of team members when user has added less than 6 members", () => {
        const fnStub = () => null;
        const { queryAllByTestId } = render(
          <TeamBuilder
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
            teamBuilderMembers={threeTeamMembers}
          />
        );

        const teamMembers = queryAllByTestId(/pokemon-(\w+)/);

        expect(teamMembers).toHaveLength(3);
      });

      it("displays correct number of team members when user has added 6 members", () => {
        const fnStub = () => null;
        const { queryAllByTestId } = render(
          <TeamBuilder
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
            teamBuilderMembers={sixTeamMembers}
          />
        );

        const teamMembers = queryAllByTestId(/pokemon-(\w+)/);

        expect(teamMembers).toHaveLength(6);
      });
    });

    describe("when user has selected a search result", () => {
      it("displays a button asking user to add that pokemon to their team", () => {
        const fnStub = () => null;
        const { queryByText } = render(
          <TeamBuilder
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
            teamBuilderCurrentSearchPokemon={pokemon[0]}
          />
        );

        expect(queryByText(/Add charmander to your team/)).toBeTruthy();
      });

      it("calls setCurrentSearchPokemon when a pokemon result has been selected", () => {
        const fnStub = () => null;
        const setCurrentSearchPokemon = jest.fn();
        const { getByPlaceholderText, getByTestId } = render(
          <TeamBuilder
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={setCurrentSearchPokemon}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
            teamBuilderMembers={threeTeamMembers}
          />
        );

        expect(setCurrentSearchPokemon).toBeCalledTimes(0);

        fireEvent.change(getByPlaceholderText(/Choose a Pokemon/), {
          target: { value: "hau" }
        });

        expect(setCurrentSearchPokemon).toBeCalledTimes(0);

        fireEvent.click(getByTestId("autocomplete-result-93"));

        expect(setCurrentSearchPokemon).toBeCalledWith(pokemon[2]);
      });

      it("calls addPokemonToTeam when user opts to add a selected pokemon to their team", () => {
        const fnStub = () => null;
        const addPokemonToTeam = jest.fn();
        const { getByText } = render(
          <TeamBuilder
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={addPokemonToTeam}
            removePokemonFromTeam={fnStub}
            teamBuilderCurrentSearchPokemon={pokemon[0]}
          />
        );

        expect(addPokemonToTeam).toBeCalledTimes(0);

        fireEvent.click(getByText(/Add charmander to your team/));

        expect(addPokemonToTeam).toBeCalledTimes(1);
        expect(addPokemonToTeam).toHaveBeenCalledWith({
          id: expect.any(String),
          pokemon: pokemon[0]
        });
      });
    });

    describe("when user attempts to submit form", () => {
      it("displays an error message for invalid team name when user has not entered a team name", () => {
        const fnStub = () => null;
        const { getByText, queryByText } = render(
          <TeamBuilder
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
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
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
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
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
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
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={mutation}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
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
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={mutation}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
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

    describe("when user edits the team members they have added", () => {
      it("calls removePokemonFromTeam when user opts to remove a pokemon from their team", () => {
        const fnStub = () => null;
        const removePokemonFromTeam = jest.fn();
        const { getByText } = render(
          <TeamBuilder
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={removePokemonFromTeam}
            teamBuilderMembers={threeTeamMembers}
          />
        );

        expect(removePokemonFromTeam).toBeCalledTimes(0);

        fireEvent.click(getByText(/Remove charmander from team/));

        expect(removePokemonFromTeam).toBeCalledTimes(1);
        expect(removePokemonFromTeam).toHaveBeenCalledWith({
          id: threeTeamMembers[1].id
        });
      });
    });

    describe("when team has been successfully created", () => {
      it("redirects to team edit form", async () => {
        const fnStub = () => null;
        const { finishLoading, history } = renderWithRouter(
          <TeamBuilder
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
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
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={setTeamName}
            setTeamMembers={setTeamMembers}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
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
            pokemon={pokemon}
            updateTeamMutation={fnStub}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
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
            pokemon={pokemon}
            updateTeamMutation={mutation}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
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
            pokemon={pokemon}
            updateTeamMutation={mutation}
            createTeamMutation={fnStub}
            setTeamName={fnStub}
            setTeamMembers={fnStub}
            setCurrentSearchPokemon={fnStub}
            addPokemonToTeam={fnStub}
            removePokemonFromTeam={fnStub}
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
