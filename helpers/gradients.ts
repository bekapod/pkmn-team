import { add, compose, divide, flatMap, join, multiply } from "lodash/fp";
import { Type } from "../types"; // eslint-disable-line import/named
import { getTypeColor, percentage, sortTypes } from "./general";

const getColourStopCss = (type: Type, position: number): string =>
  `${getTypeColor(type)} ${position}%`;

export const getTypeGradient = (types: Type[]): string => {
  const colourWidth = divide(100, types.length);
  const getColourStop = compose(
    percentage,
    multiply(colourWidth)
  );
  let index = 0; // flatMap doesn't seem to have any knowledge of the array index...

  const gradientString: string = compose(
    join(", "),
    flatMap((type: Type) => {
      const colourStops = [
        getColourStopCss(type, getColourStop(index)),
        getColourStopCss(type, getColourStop(add(1, index)))
      ];
      index = add(1, index);
      return colourStops;
    }),
    sortTypes
  )(types);

  return `linear-gradient(90deg, ${gradientString});`;
};
