import { equals, toUpper } from 'lodash/fp';
import { Pokemon } from '~/generated/graphql';

export const percentage = (val: number): number => (val > 100 ? 100 : val);

export const capitalize = (word = ''): string =>
  `${toUpper(word.charAt(0))}${word.slice(1)}`;

export const getTypeColor = (type: string): string => `var(--colors-${type})`;

export const sortBySlug = <T extends { slug: string }>(types: T[]): T[] =>
  types.sort((x: T, y: T): -1 | 0 | 1 => {
    const xSlug = x.slug;
    const ySlug = y.slug;

    if (equals(xSlug, ySlug)) {
      return 0;
    }
    if (xSlug > ySlug) {
      return 1;
    }
    return -1;
  });

export const capitalizePokemonName = (pokemon: Pick<Pokemon, 'name'>): string =>
  capitalize(pokemon.name);

export const formatPokemonName = (
  pokemon: Pick<Pokemon, 'pokedex_id' | 'name'>
): string => `#${pokemon.pokedex_id} ${capitalizePokemonName(pokemon)}`;
