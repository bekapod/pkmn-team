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
          name: "pikachu",
          pokedexId: 25,
          sprite: "pikachu.png",
          types: ["ELECTRIC"]
        })
      ).toBe("Pikachu");
    });
  });

  describe("formatPokemonName", () => {
    it("prepends pokedex id to capitalized pokemon name", () => {
      expect(
        formatPokemonName({
          id: "25",
          name: "pikachu",
          pokedexId: 25,
          sprite: "pikachu.png",
          types: ["ELECTRIC"]
        })
      ).toBe("#25 Pikachu");
    });
  });

  describe("getTypeColor", () => {
    it("gets the colour for a specific type", () => {
      expect(getTypeColor("ELECTRIC")).toBe("#F8D030");
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
      expect(sortTypes(["ICE", "BUG", "PSYCHIC", "ELECTRIC"])).toEqual([
        "BUG",
        "ELECTRIC",
        "ICE",
        "PSYCHIC"
      ]);
    });

    it("sorts types alphabetically including duplicates", () => {
      expect(
        sortTypes(["ICE", "BUG", "PSYCHIC", "BUG", "ELECTRIC", "ELECTRIC"])
      ).toEqual(["BUG", "BUG", "ELECTRIC", "ELECTRIC", "ICE", "PSYCHIC"]);
    });
  });
});
