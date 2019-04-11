import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { fireEvent, render } from "react-testing-library";
import ShallowRenderer from "react-test-renderer/shallow";
import wait from "waait";
import TeamView from ".";
import { Pokemon, TeamMember } from "../../types";

jest.mock("../../containers/PokemonSearch", () => () => (
  <div data-testid="mocked-PokemonSearch" />
));

describe("<TeamView />", () => {
  const pokemon: Pokemon = {
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
          type: {
            name: "Normal",
            slug: "normal"
          },
          name: "Substitute",
          slug: "substitute",
          damageClass: "status",
          pp: 20
        },
        levelLearnedAt: 0,
        learnMethod: "machine"
      },
      {
        version: "yellow",
        move: {
          type: {
            name: "Normal",
            slug: "normal"
          },
          name: "Slash",
          slug: "slash",
          damageClass: "physical",
          pp: 20
        },
        levelLearnedAt: 30,
        learnMethod: "level-up"
      },
      {
        version: "yellow",
        move: {
          type: {
            name: "Psychic",
            slug: "psychic"
          },
          name: "Rest",
          slug: "rest",
          damageClass: "status",
          pp: 20
        },
        levelLearnedAt: 0,
        learnMethod: "machine"
      }
    ]
  };

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
        types: [{ name: "Fire", slug: "fire" }],
        moves: [
          {
            version: "yellow",
            move: {
              type: {
                name: "Normal",
                slug: "normal"
              },
              name: "Substitute",
              slug: "substitute",
              damageClass: "status",
              pp: 20
            },
            levelLearnedAt: 0,
            learnMethod: "machine"
          },
          {
            version: "yellow",
            move: {
              type: {
                name: "Normal",
                slug: "normal"
              },
              name: "Slash",
              slug: "slash",
              damageClass: "physical",
              pp: 20
            },
            levelLearnedAt: 30,
            learnMethod: "level-up"
          },
          {
            version: "yellow",
            move: {
              type: {
                name: "Psychic",
                slug: "psychic"
              },
              name: "Rest",
              slug: "rest",
              damageClass: "status",
              pp: 20
            },
            levelLearnedAt: 0,
            learnMethod: "machine"
          }
        ]
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
        types: [{ name: "Electric", slug: "electric" }],
        moves: [
          {
            version: "yellow",
            move: {
              type: {
                name: "Normal",
                slug: "normal"
              },
              name: "Substitute",
              slug: "substitute",
              damageClass: "status",
              pp: 20
            },
            levelLearnedAt: 0,
            learnMethod: "machine"
          },
          {
            version: "yellow",
            move: {
              type: {
                name: "Psychic",
                slug: "psychic"
              },
              name: "Rest",
              slug: "rest",
              damageClass: "status",
              pp: 20
            },
            levelLearnedAt: 0,
            learnMethod: "machine"
          },
          {
            version: "yellow",
            move: {
              type: {
                name: "Normal",
                slug: "normal"
              },
              name: "Flash",
              slug: "flash",
              damageClass: "status",
              pp: 20
            },
            levelLearnedAt: 0,
            learnMethod: "machine"
          }
        ]
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
        ],
        moves: [
          {
            version: "yellow",
            move: {
              type: {
                name: "Normal",
                slug: "normal"
              },
              name: "Substitute",
              slug: "substitute",
              damageClass: "status",
              pp: 20
            },
            levelLearnedAt: 0,
            learnMethod: "machine"
          },
          {
            version: "yellow",
            move: {
              type: {
                name: "Psychic",
                slug: "psychic"
              },
              name: "Rest",
              slug: "rest",
              damageClass: "status",
              pp: 20
            },
            levelLearnedAt: 0,
            learnMethod: "machine"
          },
          {
            version: "yellow",
            move: {
              type: {
                name: "Normal",
                slug: "normal"
              },
              name: "Explosion",
              slug: "explosion",
              damageClass: "physical",
              pp: 20
            },
            levelLearnedAt: 0,
            learnMethod: "machine"
          }
        ]
      }
    }
  ];

  const sixTeamMembers: TeamMember[] = [
    ...threeTeamMembers,
    { ...threeTeamMembers[0], id: "4" },
    { ...threeTeamMembers[1], id: "5" },
    { ...threeTeamMembers[2], id: "6" }
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

  describe("when using drag & drop re-ordering", () => {
    it("does not re-order team when user drags a team member to an invalid position", () => {
      const fnStub = (): null => null;
      const reorderTeamMembers = jest.fn();
      const renderer = new ShallowRenderer();
      renderer.render(
        <TeamView
          teamMembers={threeTeamMembers}
          addPokemonToTeam={fnStub}
          removePokemonFromTeam={fnStub}
          reorderTeamMembers={reorderTeamMembers}
        />
      );

      const instance = renderer.getMountedInstance();

      instance.onDragEnd({
        source: {
          index: 0
        },
        destination: null
      });

      expect(reorderTeamMembers).toBeCalledTimes(0);
    });

    it("does not re-order team when invalid item is dragged", () => {
      const fnStub = (): null => null;
      const reorderTeamMembers = jest.fn();
      const renderer = new ShallowRenderer();
      renderer.render(
        <TeamView
          teamMembers={threeTeamMembers}
          addPokemonToTeam={fnStub}
          removePokemonFromTeam={fnStub}
          reorderTeamMembers={reorderTeamMembers}
        />
      );

      const instance = renderer.getMountedInstance();

      instance.onDragEnd({
        source: {
          index: 5
        },
        destination: {
          droppableId: "teamview-tabs",
          index: 2
        }
      });

      expect(reorderTeamMembers).toBeCalledTimes(0);
    });

    it("re-orders team when user drags a team member to another valid position", () => {
      const fnStub = (): null => null;
      const reorderTeamMembers = jest.fn();
      const renderer = new ShallowRenderer();
      renderer.render(
        <TeamView
          teamMembers={threeTeamMembers}
          addPokemonToTeam={fnStub}
          removePokemonFromTeam={fnStub}
          reorderTeamMembers={reorderTeamMembers}
        />
      );

      const instance = renderer.getMountedInstance();

      instance.onDragEnd({
        source: {
          index: 0
        },
        destination: {
          droppableId: "teamview-tabs",
          index: 2
        }
      });

      expect(reorderTeamMembers).toBeCalledWith([
        { ...threeTeamMembers[1], order: 1 },
        { ...threeTeamMembers[2], order: 2 },
        { ...threeTeamMembers[0], order: 3 }
      ]);
    });

    it("removes team member from team when user drags team member to bin", async () => {
      const fnStub = (): null => null;
      const reorderTeamMembers = jest.fn();
      const removePokemonFromTeam = jest.fn();
      const renderer = new ShallowRenderer();
      renderer.render(
        <TeamView
          teamMembers={threeTeamMembers}
          addPokemonToTeam={fnStub}
          removePokemonFromTeam={removePokemonFromTeam}
          reorderTeamMembers={reorderTeamMembers}
        />
      );

      const instance = renderer.getMountedInstance();

      instance.onDragEnd({
        source: {
          index: 2
        },
        destination: {
          droppableId: "teamview-bin",
          index: 2
        }
      });

      expect(reorderTeamMembers).toBeCalledTimes(0);
      expect(removePokemonFromTeam).toBeCalledWith("3");
      expect(instance.state.deletedItems).toEqual([threeTeamMembers[2]]);

      instance.emptyBin();
      await wait(300);

      expect(instance.state.deletedItems).toEqual([]);
    });

    it("does not remove any team members when invalid item dragged", async () => {
      const fnStub = (): null => null;
      const reorderTeamMembers = jest.fn();
      const removePokemonFromTeam = jest.fn();
      const renderer = new ShallowRenderer();
      renderer.render(
        <TeamView
          teamMembers={threeTeamMembers}
          addPokemonToTeam={fnStub}
          removePokemonFromTeam={removePokemonFromTeam}
          reorderTeamMembers={reorderTeamMembers}
        />
      );

      const instance = renderer.getMountedInstance();

      instance.onDragEnd({
        source: {
          index: 5
        },
        destination: {
          droppableId: "teamview-bin",
          index: 2
        }
      });

      expect(reorderTeamMembers).toBeCalledTimes(0);
      expect(removePokemonFromTeam).toBeCalledTimes(0);
      expect(instance.state.deletedItems).toEqual([]);

      instance.emptyBin();
      await wait(300);

      expect(instance.state.deletedItems).toEqual([]);
    });
  });
});
