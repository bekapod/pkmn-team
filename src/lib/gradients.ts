import add from 'lodash/fp/add';
import compose from 'lodash/fp/compose';
import divide from 'lodash/fp/divide';
import flatMap from 'lodash/fp/flatMap';
import join from 'lodash/fp/join';
import multiply from 'lodash/fp/multiply';
import { Type } from '~/generated/graphql';
import { getTypeColor, percentage } from './general';

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
    flatMap((type: Pick<Type, 'name' | 'slug'>) => {
      const colourStops = [
        getColourStopCss(type, getColourStop(index)),
        getColourStopCss(type, getColourStop(add(1, index)))
      ];
      index = add(1, index);
      return colourStops;
    })
  )(types);

  return `linear-gradient(90deg, ${gradientString})`;
};
