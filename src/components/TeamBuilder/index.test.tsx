import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
// tslint:disable-next-line:no-implicit-dependencies
import { cleanup, fireEvent, render } from "react-testing-library";
import TeamBuilder from ".";
import { IPokemon, ITeamMember } from "../../types";

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

  afterEach(() => {
    cleanup();
  });

  it("renders without crashing with empty state", () => {
    const fnStub = () => null;
    const tree = renderer.create(
      <TeamBuilder
        pokemon={pokemon}
        createTeamMutation={fnStub}
        setTeamName={fnStub}
        setCurrentSearchPokemon={fnStub}
        addPokemonToTeam={fnStub}
        removePokemonFromTeam={fnStub}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders without crashing when user has set a team name", () => {
    const fnStub = () => null;
    const tree = renderer.create(
      <TeamBuilder
        pokemon={pokemon}
        createTeamMutation={fnStub}
        setTeamName={fnStub}
        setCurrentSearchPokemon={fnStub}
        addPokemonToTeam={fnStub}
        removePokemonFromTeam={fnStub}
        teamBuilderName="My Team"
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders without crashing when user has less than 6 members in their team", () => {
    const fnStub = () => null;
    const tree = renderer.create(
      <TeamBuilder
        pokemon={pokemon}
        createTeamMutation={fnStub}
        setTeamName={fnStub}
        setCurrentSearchPokemon={fnStub}
        addPokemonToTeam={fnStub}
        removePokemonFromTeam={fnStub}
        teamBuilderMembers={threeTeamMembers}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders without crashing when user has 6 members in their team", () => {
    const fnStub = () => null;
    const tree = renderer.create(
      <TeamBuilder
        pokemon={pokemon}
        createTeamMutation={fnStub}
        setTeamName={fnStub}
        setCurrentSearchPokemon={fnStub}
        addPokemonToTeam={fnStub}
        removePokemonFromTeam={fnStub}
        teamBuilderMembers={sixTeamMembers}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders without crashing when user has selected a search result", () => {
    const fnStub = () => null;
    const tree = renderer.create(
      <TeamBuilder
        pokemon={pokemon}
        createTeamMutation={fnStub}
        setTeamName={fnStub}
        setCurrentSearchPokemon={fnStub}
        addPokemonToTeam={fnStub}
        removePokemonFromTeam={fnStub}
        teamBuilderCurrentSearchPokemon={pokemon[0]}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders the team name error message when user attempts to submit form without entering a team name", () => {
    const fnStub = () => null;
    const { getByText, queryByText } = render(
      <TeamBuilder
        pokemon={pokemon}
        createTeamMutation={fnStub}
        setTeamName={fnStub}
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

  it("calls setTeamName when user enters a team name", () => {
    const fnStub = () => null;
    const setTeamName = jest.fn();
    const { getByPlaceholderText } = render(
      <TeamBuilder
        pokemon={pokemon}
        createTeamMutation={fnStub}
        setTeamName={setTeamName}
        setCurrentSearchPokemon={fnStub}
        addPokemonToTeam={fnStub}
        removePokemonFromTeam={fnStub}
        teamBuilderMembers={threeTeamMembers}
      />
    );

    expect(setTeamName).toBeCalledTimes(0);

    fireEvent.change(getByPlaceholderText(/Choose a team name/), {
      target: { value: "My Team Name" }
    });

    expect(setTeamName).toBeCalledTimes(1);
    expect(setTeamName).toHaveBeenCalledWith("My Team Name");
  });

  it("calls setCurrentSearchPokemon when a pokemon result has been selected", () => {
    const fnStub = () => null;
    const setCurrentSearchPokemon = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <TeamBuilder
        pokemon={pokemon}
        createTeamMutation={fnStub}
        setTeamName={fnStub}
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
        createTeamMutation={fnStub}
        setTeamName={fnStub}
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

  it("calls removePokemonFromTeam when user opts to remove a pokemon from their team", () => {
    const fnStub = () => null;
    const removePokemonFromTeam = jest.fn();
    const { getByText } = render(
      <TeamBuilder
        pokemon={pokemon}
        createTeamMutation={fnStub}
        setTeamName={fnStub}
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

  it("calls createTeamMutation when user submits team creation form with valid data", () => {
    const fnStub = () => null;
    const mutation = jest.fn();
    const { getByText } = render(
      <TeamBuilder
        pokemon={pokemon}
        createTeamMutation={mutation}
        setTeamName={fnStub}
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
        createTeamMutation={mutation}
        setTeamName={fnStub}
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
