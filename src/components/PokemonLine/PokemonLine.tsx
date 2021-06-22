import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import classNames from 'classnames';
import type { PokemonFragmentFragment } from '~/generated/graphql';
import { formatPokemonName, sortBySlug } from '~/lib/general';
import { getTypeGradient } from '~/lib/gradients';
import { InlineList } from '../InlineList';
import { TypeTag } from '../TypeTag';

export type PokemonLineProps = {
  pokemon: Omit<
    PokemonFragmentFragment,
    'eggGroups' | 'evolvesTo' | 'evolvesFrom' | 'moves'
  >;
  outdent?: string;
};

export const PokemonLine: FunctionComponent<
  ComponentPropsWithRef<'div'> & PokemonLineProps
> = ({ pokemon, outdent, style, className, ...props }) => {
  const { pokedexId, name, types, sprite } = pokemon;

  return (
    <div
      className={classNames(
        'pokemon-line-template',
        'relative',
        'flex',
        'items-center',
        'h-10',
        className
      )}
      style={{
        ...style,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        '--outdent': outdent,
        '--type-gradient': getTypeGradient(
          types.pokemonTypes.map(({ type }) => type)
        )
      }}
      {...props}
    >
      <img
        className={classNames('w-8', 'h-8', 'mr-4')}
        src={`/sprites/${sprite}`}
        alt={`${name} sprite`}
      />
      <div>
        <div className={classNames('mb-2', 'font-bold', 'leading-none')}>
          {formatPokemonName(pokemon)}
        </div>
        <InlineList>
          {sortBySlug(types.pokemonTypes.map(({ type }) => type)).map(type => (
            <li key={`Pokemon: ${pokedexId}, Type: ${type.slug}`}>
              <TypeTag typeSlug={type.slug}>{type.name}</TypeTag>
            </li>
          ))}
        </InlineList>
      </div>
    </div>
  );
};
