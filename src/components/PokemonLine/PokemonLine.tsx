import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import type { Pokemon } from '~/generated/graphql';
import { formatPokemonName, sortBySlug } from '~/lib/general';
import { getTypeGradient } from '~/lib/gradients';
import { InlineList } from '../InlineList';
import { TypeTag } from '../TypeTag';
import styles from './PokemonLine.module.css';

export type PokemonLineProps = {
  pokemon: Pick<
    Pokemon,
    'id' | 'pokedex_id' | 'name' | 'slug' | 'sprite' | 'types'
  >;
  outdent?: string;
};

export const PokemonLine: FunctionComponent<
  ComponentPropsWithRef<'div'> & PokemonLineProps
> = ({ pokemon, outdent, style, ...props }) => {
  const { pokedex_id, name, types, sprite } = pokemon;

  return (
    <div
      className={styles.row}
      style={{
        ...style,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        '--outdent': outdent,
        '--type-gradient': getTypeGradient(types.map(({ type }) => type))
      }}
      {...props}
    >
      <img
        className={styles.sprite}
        src={`/sprites/${sprite}`}
        alt={`${name} sprite`}
      />
      <div>
        <div className={styles.title}>{formatPokemonName(pokemon)}</div>
        <InlineList>
          {sortBySlug(types.map(({ type }) => type)).map(type => (
            <li key={`Pokemon: ${pokedex_id}, Type: ${type.slug}`}>
              <TypeTag type={type.slug}>{type.name}</TypeTag>
            </li>
          ))}
        </InlineList>
      </div>
    </div>
  );
};
