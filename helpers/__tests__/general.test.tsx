import {
  capitalize,
  capitalizePokemonName,
  formatPokemonName,
  getTypeColor,
  getUniqueId,
  percentage,
  sortTypes
} from "../general";

describe("General helpers", () => {
  describe("capitalize", () => {
    it("capitalizes the first letter of a string", () => {
      expect(capitalize("mr mime")).toBe("Mr mime");
    });
  });

  describe("capitalizePokemonName", () => {
    it("capitalizes the name of a pokemon", () => {
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

  describe("formatPokemonName", () => {
    it("prepends pokedex id to capitalized pokemon name", () => {
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

  describe("getTypeColor", () => {
    it("gets the colour for a specific type", () => {
      expect(getTypeColor("electric")).toBe("#F8D030");
    });
  });

  describe("getUniqueId", () => {
    it("returns a random string", () => {
      const first = getUniqueId();
      const second = getUniqueId();

      expect(first).toEqual(expect.any(String));
      expect(first).not.toEqual(second);
    });
  });

  describe("percentage", () => {
    it("returns passed in value when less than 100", () => {
      expect(percentage(56)).toBe(56);
    });

    it("returns passed in value when equals 100", () => {
      expect(percentage(100)).toBe(100);
    });

    it("returns 100 when greater than 100", () => {
      expect(percentage(150)).toBe(100);
    });
  });

  describe("sortTypes", () => {
    it("sorts types alphabetically", () => {
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

    it("sorts types alphabetically including duplicates", () => {
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
