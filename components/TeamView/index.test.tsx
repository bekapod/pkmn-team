import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { fireEvent, render } from "react-testing-library";
import wait from "waait";
import TeamView from ".";
import { Pokemon, TeamMember } from "../../types";

jest.mock("../../containers/PokemonSearch", () => () => (
  <div data-testid="mocked-PokemonSearch" />
));

describe("<TeamView />", () => {
  const pokemon: Pokemon = {
    id: "4",
    name: "charmander",
    pokedexId: 4,
    sprite: "4.png",
    types: ["FIRE"]
  };

  const threeTeamMembers: TeamMember[] = [
    {
      id: "1",
      order: 1,
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
      order: 2,
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
      order: 3,
      pokemon: {
        id: "93",
        name: "haunter",
        pokedexId: 93,
        sprite: "93.png",
        types: ["GHOST", "POISON"]
      }
    }
  ];

  const sixTeamMembers: TeamMember[] = [
    {
      id: "1",
      order: 1,
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
      order: 2,
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
      order: 3,
      pokemon: {
        id: "93",
        name: "haunter",
        pokedexId: 93,
        sprite: "93.png",
        types: ["GHOST", "POISON"]
      }
    },
    {
      id: "4",
      order: 4,
      pokemon: {
        id: "4",
        name: "charmander",
        pokedexId: 4,
        sprite: "4.png",
        types: ["FIRE"]
      }
    },
    {
      id: "5",
      order: 5,
      pokemon: {
        id: "25",
        name: "pikachu",
        pokedexId: 25,
        sprite: "25.png",
        types: ["ELECTRIC"]
      }
    },
    {
      id: "6",
      order: 6,
      pokemon: {
        id: "93",
        name: "haunter",
        pokedexId: 93,
        sprite: "93.png",
        types: ["GHOST", "POISON"]
      }
    }
  ];

  it("applies props from Tabs component correctly", async () => {
    const fnStub = (): null => null;
    const { getByTestId } = render(
      <TeamView
        teamMembers={threeTeamMembers}
        addPokemonToTeam={fnStub}
        removePokemonFromTeam={fnStub}
        reorderTeamMembers={fnStub}
      />
    );

    expect(getByTestId("tab-item-1").getAttribute("aria-selected")).toBe(
      "true"
    );
    expect(getByTestId("tab-content-1").getAttribute("aria-hidden")).toBe(
      "false"
    );

    fireEvent.click(getByTestId("tab-item-2"));

    expect(getByTestId("tab-item-2").getAttribute("aria-selected")).toBe(
      "true"
    );
    expect(getByTestId("tab-content-2").getAttribute("aria-hidden")).toBe(
      "false"
    );

    expect(document.activeElement).not.toBe(
      getByTestId("tab-content-add-pokemon")
    );

    fireEvent.keyDown(getByTestId("tab-item-add-pokemon"), { key: "Enter" });

    expect(
      getByTestId("tab-item-add-pokemon").getAttribute("aria-selected")
    ).toBe("true");
    expect(
      getByTestId("tab-content-add-pokemon").getAttribute("aria-hidden")
    ).toBe("false");

    await wait(1);
    expect(document.activeElement).toBe(getByTestId("tab-content-add-pokemon"));
  });

  describe("with less than 6 team members", () => {
    it("renders a tab for each pokemon plus a tab for pokemon search", () => {
      const fnStub = (): null => null;
      const { queryByTestId, queryAllByTestId } = render(
        <TeamView
          teamMembers={threeTeamMembers}
          addPokemonToTeam={fnStub}
          removePokemonFromTeam={fnStub}
          reorderTeamMembers={fnStub}
        />
      );

      expect(queryAllByTestId(/tab-item-/)).toHaveLength(4);
      expect(queryAllByTestId(/tab-content-/)).toHaveLength(4);
      expect(queryByTestId("tab-item-add-pokemon")).toBeTruthy();
      expect(queryByTestId("tab-content-add-pokemon")).toBeTruthy();
    });
  });

  describe("with 6 team members", () => {
    it("renders a tab for each pokemon plus a tab for pokemon search", () => {
      const fnStub = (): null => null;
      const { queryByTestId, queryAllByTestId } = render(
        <TeamView
          teamMembers={sixTeamMembers}
          addPokemonToTeam={fnStub}
          removePokemonFromTeam={fnStub}
          reorderTeamMembers={fnStub}
        />
      );

      expect(queryAllByTestId(/tab-item-/)).toHaveLength(6);
      expect(queryAllByTestId(/tab-content-/)).toHaveLength(6);
      expect(queryByTestId("tab-item-add-pokemon")).toBeFalsy();
      expect(queryByTestId("tab-content-add-pokemon")).toBeFalsy();
    });
  });

  describe("with a search pokemon selected", () => {
    it("renders the currently selected pokemon", () => {
      const fnStub = (): null => null;
      const { queryByText } = render(
        <TeamView
          teamMembers={threeTeamMembers}
          currentSearchPokemon={pokemon}
          addPokemonToTeam={fnStub}
          removePokemonFromTeam={fnStub}
          reorderTeamMembers={fnStub}
        />
      );

      expect(
        queryByText(/Charmander/i, {
          selector: '[data-testid="tab-content-add-pokemon"] *'
        })
      ).toBeTruthy();
    });
  });
});
