import {
  capitalize,
  capitalizePokemonName,
  formatPokemonName,
  getTypeColor,
  getUniqueId,
  percentage,
  sortTypes
} from "../general";

describe("General helpers", (): void => {
  describe("capitalize", (): void => {
    it("capitalizes the first letter of a string", (): void => {
      expect(capitalize("mr mime")).toBe("Mr mime");
    });
  });

  describe("capitalizePokemonName", (): void => {
    it("capitalizes the name of a pokemon", (): void => {
      expect(
        capitalizePokemonName({
          id: "25",
          name: "Pikachu",
          slug: "pikachu",
          pokedexId: 25,
          sprite: "pikachu.png",
          types: [{ name: "Electric", slug: "electric" }]
        })
      ).toBe("Pikachu");
    });
  });

  describe("formatPokemonName", (): void => {
    it("prepends pokedex id to capitalized pokemon name", (): void => {
      expect(
        formatPokemonName({
          id: "25",
          name: "Pikachu",
          slug: "pikachu",
          pokedexId: 25,
          sprite: "pikachu.png",
          types: [{ name: "Electric", slug: "electric" }]
        })
      ).toBe("#25 Pikachu");
    });
  });

  describe("getTypeColor", (): void => {
    it("gets the colour for a specific type", (): void => {
      expect(getTypeColor("electric")).toBe("#F8D030");
    });
  });

  describe("getUniqueId", (): void => {
    it("returns a random string", (): void => {
      const first = getUniqueId();
      const second = getUniqueId();

      expect(first).toEqual(expect.any(String));
      expect(first).not.toEqual(second);
    });
  });

  describe("percentage", (): void => {
    it("returns passed in value when less than 100", (): void => {
      expect(percentage(56)).toBe(56);
    });

    it("returns passed in value when equals 100", (): void => {
      expect(percentage(100)).toBe(100);
    });

    it("returns 100 when greater than 100", (): void => {
      expect(percentage(150)).toBe(100);
    });
  });

  describe("sortTypes", (): void => {
    it("sorts types alphabetically", (): void => {
      expect(
        sortTypes([
          { name: "Ice", slug: "ice" },
          { name: "Bug", slug: "bug" },
          { name: "Psychic", slug: "psychic" },
          { name: "Electric", slug: "electric" }
        ])
      ).toEqual([
        { name: "Bug", slug: "bug" },
        { name: "Electric", slug: "electric" },
        { name: "Ice", slug: "ice" },
        { name: "Psychic", slug: "psychic" }
      ]);
    });

    it("sorts types alphabetically including duplicates", (): void => {
      expect(
        sortTypes([
          { name: "Ice", slug: "ice" },
          { name: "Bug", slug: "bug" },
          { name: "Psychic", slug: "psychic" },
          { name: "Bug", slug: "bug" },
          { name: "Electric", slug: "electric" },
          { name: "Electric", slug: "electric" }
        ])
      ).toEqual([
        { name: "Bug", slug: "bug" },
        { name: "Bug", slug: "bug" },
        { name: "Electric", slug: "electric" },
        { name: "Electric", slug: "electric" },
        { name: "Ice", slug: "ice" },
        { name: "Psychic", slug: "psychic" }
      ]);
    });
  });
});
