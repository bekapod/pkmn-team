import { lineHeight } from "../verticalRhythm";

describe("Vertical rhythm helpers", (): void => {
  describe("lineHeight", (): void => {
    it("returns default value when nothing passed", (): void => {
      expect(lineHeight()).toBe(1.8333);
    });

    it("returns correct value when value passed in", (): void => {
      expect(lineHeight("md")).toBe(1.5);
    });
  });
});
