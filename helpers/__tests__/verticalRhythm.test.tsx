import { lineHeight } from "../verticalRhythm";

describe("Vertical rhythm helpers", () => {
  describe("lineHeight", () => {
    it("returns default value when nothing passed", () => {
      expect(lineHeight()).toBe(1.8333);
    });

    it("returns correct value when value passed in", () => {
      expect(lineHeight("md")).toBe(1.5);
    });
  });
});
