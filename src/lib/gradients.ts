import { add, compose, divide, flatMap, join, multiply } from 'lodash/fp';
import { Type } from '~/generated/graphql';
import { getTypeColor, percentage, sortBySlug } from './general';

const getColourStopCss = (
  type: Pick<Type, 'name' | 'slug'>,
  position: number
) => `${getTypeColor(type.slug)} ${position}%`;

export const getTypeGradient = (
  types: Pick<Type, 'name' | 'slug'>[]
): string => {
  const colourWidth = divide(100, types.length);
  const getColourStop = compose(percentage, multiply(colourWidth));
  let index = 0;

  const gradientString = compose(
    join(', '),
    flatMap(type => {
      const colourStops = [
        getColourStopCss(type, getColourStop(index)),
        getColourStopCss(type, getColourStop(add(1, index)))
      ];
      index = add(1, index);
      return colourStops;
    }),
    (t: Pick<Type, 'name' | 'slug'>[]) =>
      sortBySlug<Pick<Type, 'name' | 'slug'>>(t)
  )(types);

  return `linear-gradient(90deg, ${gradientString});`;
};