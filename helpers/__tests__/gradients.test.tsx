import { getTypeGradient } from "../gradients";

describe("Gradients helpers", (): void => {
  describe("getTypeGradient", (): void => {
    it("returns correct css gradient for an array of types", (): void => {
      expect(
        getTypeGradient([
          { name: "Grass", slug: "grass" },
          { name: "Poison", slug: "poison" },
          { name: "Fire", slug: "fire" },
          { name: "Water", slug: "water" },
          { name: "Electric", slug: "electric" }
        ])
      ).toBe(
        "linear-gradient(90deg, #F8D030 0%, #F8D030 20%, #F08030 20%, #F08030 40%, #78C850 40%, #78C850 60%, #A040A0 60%, #A040A0 80%, #6890F0 80%, #6890F0 100%);"
      );
    });

    it("returns correct css gradient for an array of types including duplicates", (): void => {
      expect(
        getTypeGradient([
          { name: "Electric", slug: "electric" },
          { name: "Grass", slug: "grass" },
          { name: "Poison", slug: "poison" },
          { name: "Water", slug: "water" },
          { name: "Fire", slug: "fire" },
          { name: "Flying", slug: "flying" },
          { name: "Normal", slug: "normal" },
          { name: "Flying", slug: "flying" },
          { name: "Normal", slug: "normal" }
        ])
      ).toBe(
        "linear-gradient(90deg, #F8D030 0%, #F8D030 11.11111111111111%, #F08030 11.11111111111111%, #F08030 22.22222222222222%, #A890F0 22.22222222222222%, #A890F0 33.33333333333333%, #A890F0 33.33333333333333%, #A890F0 44.44444444444444%, #78C850 44.44444444444444%, #78C850 55.55555555555556%, #A8A878 55.55555555555556%, #A8A878 66.66666666666666%, #A8A878 66.66666666666666%, #A8A878 77.77777777777777%, #A040A0 77.77777777777777%, #A040A0 88.88888888888889%, #6890F0 88.88888888888889%, #6890F0 100%);"
      );
    });

    it("returns correct css gradient for a single type", (): void => {
      expect(getTypeGradient([{ name: "Electric", slug: "electric" }])).toBe(
        "linear-gradient(90deg, #F8D030 0%, #F8D030 100%);"
      );
    });

    it("returns correct css gradient for over 10 types", (): void => {
      expect(
        getTypeGradient([
          { name: "Grass", slug: "grass" },
          { name: "Poison", slug: "poison" },
          { name: "Fire", slug: "fire" },
          { name: "Flying", slug: "flying" },
          { name: "Fairy", slug: "fairy" },
          { name: "Psychic", slug: "psychic" },
          { name: "Flying", slug: "flying" },
          { name: "Normal", slug: "normal" },
          { name: "Bug", slug: "bug" },
          { name: "Poison", slug: "poison" },
          { name: "Ground", slug: "ground" },
          { name: "Poison", slug: "poison" }
        ])
      ).toBe(
        "linear-gradient(90deg, #A8B820 0%, #A8B820 8.333333333333334%, #EE99AC 8.333333333333334%, #EE99AC 16.666666666666668%, #F08030 16.666666666666668%, #F08030 25%, #A890F0 25%, #A890F0 33.333333333333336%, #A890F0 33.333333333333336%, #A890F0 41.66666666666667%, #78C850 41.66666666666667%, #78C850 50%, #E0C068 50%, #E0C068 58.333333333333336%, #A8A878 58.333333333333336%, #A8A878 66.66666666666667%, #A040A0 66.66666666666667%, #A040A0 75%, #A040A0 75%, #A040A0 83.33333333333334%, #A040A0 83.33333333333334%, #A040A0 91.66666666666667%, #F85888 91.66666666666667%, #F85888 100%);"
      );
    });
  });
});
