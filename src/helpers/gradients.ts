import {
  compose,
  divide,
  multiply,
  identity,
  inc,
  join,
  flatten,
  append,
  prepend,
  unapply
} from "ramda";
import { percentage, getTypeColor, sortTypes } from "./general";
import { Type } from "../types";

const getColourStopCss = (type: Type, position: number) =>
  `${getTypeColor(type)} ${position}%`;

export const getTypeGradient = (types: Array<Type>) => {
  const colourWidth = divide(100, types.length);
  const getColourStop = compose(
    percentage,
    multiply(colourWidth)
  );

  const gradientString: string = compose(
    join(", "),
    (types: Type[]) => (
      types.flatMap((type: Type, index: number) => [
        getColourStopCss(type, getColourStop(index)),
        getColourStopCss(type, getColourStop(inc(index)))
      ])
    ),
    sortTypes
  )(types);

  return `linear-gradient(90deg, ${gradientString});`;
};
