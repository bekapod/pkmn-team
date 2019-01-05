import { compose, divide, inc, join, multiply } from "ramda";
import { Type } from "../types";
import { getTypeColor, percentage, sortTypes } from "./general";

const getColourStopCss = (type: Type, position: number) =>
  `${getTypeColor(type)} ${position}%`;

export const getTypeGradient = (types: Type[]) => {
  const colourWidth = divide(100, types.length);
  const getColourStop = compose(
    percentage,
    multiply(colourWidth)
  );

  const gradientString: string = compose(
    join(", "),
    (ts: Type[]) =>
      ts.flatMap((type: Type, index: number) => [
        getColourStopCss(type, getColourStop(index)),
        getColourStopCss(type, getColourStop(inc(index)))
      ]),
    sortTypes
  )(types);

  return `linear-gradient(90deg, ${gradientString});`;
};
