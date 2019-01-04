// @flow
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
import type { Type } from "../types";

const getColourStopCss = (type: Type, position: number) =>
  `${getTypeColor(type)} ${position}%`;

export const getTypeGradient = (types: Array<Type>) => {
  const colourWidth = divide(100, types.length);
  const getColourStop = compose(
    percentage,
    multiply(colourWidth)
  );

  const gradientString = compose(
    join(", "),
    flatten,
    t =>
      t.map((type: Type, index: number) => [
        getColourStopCss(type, getColourStop(index)),
        getColourStopCss(type, getColourStop(inc(index)))
      ]),
    sortTypes
  )(types);

  return compose(
    join(""),
    prepend("linear-gradient(90deg, "),
    append(");"),
    unapply(identity)
  )(gradientString);
};
